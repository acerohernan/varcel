import { z } from "zod";
import { config } from "dotenv";

import { logger } from "./logger";

config({});

const envSchema = z.object({
  PORT: z.preprocess(Number, z.number()),
});

const validation = envSchema.safeParse(process.env);

if (!validation.success) {
  const errors = validation.error.issues.map(
    (issue) => `${issue.path}: ${issue.message} error`
  );
  logger.error(
    "ENV VALIDATION ERROR: Please check your env variables and restart the process"
  );
  console.error(`ENV ERRORS:`, errors);
  throw new Error("ENV VALIDATION ERROR");
}

export const env = validation.data;
