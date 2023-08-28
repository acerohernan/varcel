import { z } from "zod";
import { config } from "dotenv";

import { logger } from "./logger";

config({});

const envSchema = z.object({
  PORT: z.preprocess(Number, z.number()),
  FRONTEND_URL: z.string().nonempty(),

  JWT_SECRET: z.string().nonempty(),
  JWT_SESSION_DURATION_IN_SECONDS: z.preprocess(Number, z.number()),

  GITHUB_OAUTH_CLIENT_ID: z.string(),
  GITHUB_OAUTH_CLIENT_SECRET: z.string(),

  GITHUB_APP_CLIENT_ID: z.string().nonempty(),
  GITHUB_APP_CLIENT_SECRET: z.string().nonempty(),
  GITHUB_APP_ID: z.string().nonempty(),
  GITHUB_APP_SECRET_KEY: z.string().nonempty(),

  POSTGRES_URL: z.string().nonempty(),
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
