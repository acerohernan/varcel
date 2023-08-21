import jwt from "jsonwebtoken";

import { env } from "@/config/env";

export const signJwtToken = (
  payload: Record<string, any>,
  options: jwt.SignOptions = {}
): string => {
  const expiresIn = env.JWT_SESSION_DURATION_IN_SECONDS;
  const token = jwt.sign(payload, env.JWT_SECRET, { ...options, expiresIn });
  return token;
};

interface JwtResponse<T> {
  success: boolean;
  data?: T;
  expired: boolean;
}

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
