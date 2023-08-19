import { UnathorizedError } from "@/lib/errors";
import { Request, Response } from "express";

export function githubCallbackHandler(req: Request, res: Response) {
  const { user } = req;

  if (!user) throw new UnathorizedError("Github sign in error");

  // Search in database

  // Create account if there's not in the db

  // Create jwt token

  // Send jwt token

  res.send(user);
}
