import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import { Request, Response } from "express";

import { db } from "@/db";
import { userGhIntegrations, users } from "@/db/schema/user";
import { User, UserGhIntegration } from "@/db/types";

import { BadRequestError } from "@/lib/errors";

import { signJwtToken } from "@v1/shared/services/jwt.service";

export async function githubCallbackHandler(req: Request, res: Response) {
  const ghProfile: any = req.user;

  if (!ghProfile && !ghProfile.emails)
    throw new BadRequestError("Github sign in error");

  // Get user email
  const userGhId = ghProfile.id;
  const userGhUsername = ghProfile.username;
  const userGhEmail = ghProfile.emails[0].value;

  if (!userGhEmail || !userGhId || !userGhUsername)
    throw new BadRequestError("Github sign in error");

  let user: User | undefined;

  // Search in database
  user = await db.query.users.findFirst({
    where: eq(users.email, userGhEmail),
  });

  if (!user) {
    // Create a new account
    let newUser: User = {
      id: uuid(),
      email: userGhEmail,
      username: userGhUsername,
      tierId: "47955fa1-02af-4dc0-b098-00404b0e52fb",
    };

    let newGhIntegration: UserGhIntegration = {
      id: uuid(),
      userId: newUser.id,
      ghUserId: userGhId,
      ghInstallationId: null,
    };

    await db.transaction(async (tx) => {
      await tx.insert(users).values(newUser);
      await tx.insert(userGhIntegrations).values(newGhIntegration);
    });

    user = newUser;
  }

  const accessToken = signJwtToken({ id: user.id });

  res.send({ accessToken });
}
