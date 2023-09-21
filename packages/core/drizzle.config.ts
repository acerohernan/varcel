import { config } from "dotenv";
import type { Config } from "drizzle-kit";

config({});

export default {
  schema: "./src/db/schema/*",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL as string,
  },
} satisfies Config;
