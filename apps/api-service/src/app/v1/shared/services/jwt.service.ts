import jwt from "jsonwebtoken";

import { env } from "@/config/env";
import { injectable } from "inversify";

interface JwtResponse<T> {
  success: boolean;
  data?: T;
  expired: boolean;
}

@injectable()
export class JWTService {
  constructor() {}

  signJwtToken(
    payload: Record<string, any>,
    options: jwt.SignOptions = {}
  ): string {
    const expiresIn = env.JWT_SESSION_DURATION_IN_SECONDS;
    const token = jwt.sign(payload, env.JWT_SECRET, { ...options, expiresIn });
    return token;
  }

  verifyJwtToken<T>(token: string): JwtResponse<T> {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as T;
      return {
        success: true,
        expired: false,
        data: decoded,
      };
    } catch (error: any) {
      return {
        success: false,
        expired: error.message === "jwt expired",
      };
    }
  }
}

export const signJwtToken = (
  payload: Record<string, any>,
  options: jwt.SignOptions = {}
): string => {
  const expiresIn = env.JWT_SESSION_DURATION_IN_SECONDS;
  const token = jwt.sign(payload, env.JWT_SECRET, { ...options, expiresIn });
  return token;
};

export const verifyJwtToken = <T>(token: string): JwtResponse<T> => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as T;
    return {
      success: true,
      expired: false,
      data: decoded,
    };
  } catch (error: any) {
    return {
      success: false,
      expired: error.message === "jwt expired",
    };
  }
};
