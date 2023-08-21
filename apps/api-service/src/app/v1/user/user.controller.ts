import axios from "axios";
import { eq } from "drizzle-orm";
import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";
import { Request, Response } from "express";

import { db } from "@/db";
import { userGhIntegrations } from "@/db/schema/user";

import { BadRequestError, UnathorizedError } from "@/lib/errors";

import { env } from "@/config/env";
import { logger } from "@/config/logger";

import { JWTUser } from "../shared/middlewares/verifyJwt";

export async function setupGithubIntegrationHandler(
  req: Request,
  res: Response
) {
  const installationId = parseInt(req.query.installation_id as string);
  const code = req.query.code as string;

  if (!installationId) throw new BadRequestError("Installation id is required");
  if (!code) throw new BadRequestError("Code is required");

  const params = new URLSearchParams({
    client_id: env.GITHUB_APP_CLIENT_ID,
    client_secret: env.GITHUB_APP_CLIENT_SECRET,
    code,
  });

  const url = `https://github.com/login/oauth/access_token?${params.toString()}`;
  const response = await axios.post(url, null);
  const data = response.data as string;

  if (response.status !== 200)
    throw new BadRequestError("Error at getting access token from github");

  const token = data.split("&")[0].replace("access_token=", "");

  if (!token)
    throw new BadRequestError("Error at getting access token from github");

  const octokit = new Octokit({ auth: token });

  const request = await octokit.users.getAuthenticated();

  const userGithubId = request.data.id;

  // Query a user with the same github id
  const integration = await db.query.userGhIntegrations.findFirst({
    where: eq(userGhIntegrations.ghUserId, userGithubId),
  });

  if (!integration) return res.send({ message: "NOT INTERATION IN DB" });

  // Save the integration id to the db
  await db
    .update(userGhIntegrations)
    .set({ ghInstallationId: installationId })
    .where(eq(userGhIntegrations.id, integration.id));

  res.send({ message: "OK" });
}

export async function getRepositoriesHandler(req: Request, res: Response) {
  const user: JWTUser = res.locals.user;

  if (!user) throw new UnathorizedError("Token malformed");

  let repositories: Array<any> = [];
  let totalCount: number = 0;

  // Find user's github integration
  const integration = await db.query.userGhIntegrations.findFirst({
    where: eq(userGhIntegrations.userId, user.id),
  });

  if (!integration || !integration.ghInstallationId)
    return res.send({ repositories, totalCount });

  // Get the repositories for installitation
  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: env.GITHUB_APP_ID,
      privateKey: env.GITHUB_APP_SECRET_KEY,
      installationId: integration.ghInstallationId,
    },
  });

  try {
    const request = await octokit.apps.listReposAccessibleToInstallation({
      page: 1,
      per_page: 5,
    });
    repositories = request.data.repositories;
    totalCount = request.data.total_count;
  } catch (error) {
    logger.error(
      `Error at retrieving repositories for installation id ${integration.ghInstallationId}`
    );
    console.error(error);
  }

  res.send({ repositories, totalCount });
}
