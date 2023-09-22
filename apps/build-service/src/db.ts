import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "@vercelclone/core/src/db/";

import { env } from "@/config/env";

const client = postgres(env.POSTGRES_URL);
export const db = drizzle(client, { schema });
