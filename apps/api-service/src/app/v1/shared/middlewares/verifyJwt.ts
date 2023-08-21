import { NextFunction, Request, Response } from "express";
import { verifyJwtToken } from "../services/jwt.service";
import { UnathorizedError } from "@/lib/errors";

export type JWTUser = { id: string };

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) throw new UnathorizedError("JWT Invalid");

  const token = bearer.replace("Bearer ", "");

  if (!token) throw new UnathorizedError("JWT Invalid");

  const { data: user } = verifyJwtToken<JWTUser>(token);

  if (!user) throw new UnathorizedError("JWT Invalid");

  res.locals.user = user;

  next();
};
