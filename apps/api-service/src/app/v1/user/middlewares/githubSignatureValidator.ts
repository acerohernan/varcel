import crypto from "crypto";
import { NextFunction, Request, Response } from "express";

import { env } from "@/config/env";
import { logger } from "@/config/logger";
import { UnathorizedError } from "@/lib/errors";

const signatureKey = "x-hub-signature-256";

export function githubSignatureValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requestSignature = req.headers[signatureKey];
  const body = JSON.stringify(req.body);

  logger.info(`Signature received from github: ${requestSignature}`);

  if (!requestSignature || typeof requestSignature !== "string")
    throw new UnathorizedError(`Invalid signature`);

  const signature =
    "sha256=" +
    crypto
      .createHmac("sha256", env.GITHUB_WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

  logger.info(`Signature created from secret: ${signature}`);

  const isValid = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(requestSignature)
  );

  if (!isValid) throw new UnathorizedError(`Invalid signature`);

  logger.info("Signature were verified successfully!");

  next();
}
