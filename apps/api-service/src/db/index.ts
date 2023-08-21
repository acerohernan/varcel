import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { env } from "@/config/env";

import { schema } from "./schema";

const client = postgres(env.POSTGRES_URL);
export const db = drizzle(client, { schema });
