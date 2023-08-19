import { Request, Response } from "express";

export function githubCallbackHandler(req: Request, res: Response) {
  const { user } = req;

  if (!user) res.status(501);
}
