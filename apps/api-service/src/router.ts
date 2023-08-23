import morgan from "morgan";
import Router from "express-promise-router";
import { NextFunction, Request, Response } from "express";

import { HttpError } from "@/lib/errors";
import { logger } from "@/config/logger";

import { v1Router } from "@v1/router";

export const router = Router();

router.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

router.use("/v1", v1Router);

router.use(function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.errors && err.code && err.code !== 500) {
    const { code, message, errors } = err;

    if (code === 400) return res.status(code).send({ errors });

    return res.status(code).send({ error: message });
  }

  logger.error(`Internal server error detected!`);
  console.error(err);

  res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
});
