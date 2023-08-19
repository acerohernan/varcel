import { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import Router from "express-promise-router";

import { v1Router } from "@v1/router";
import { HttpError } from "@/lib/errors";
import { logger } from "./config/logger";

export const router = Router();

router.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

router.use("/v1", v1Router);

router.use(function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpError) {
    const { code, message, errors } = err;

    if (code === 400) return res.status(code).send({ errors });

    return res.status(code).send({ error: message });
  }

  logger.error(`Internal server error detected!`);
  console.error(err);

  res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
});
