import { InferModel } from "drizzle-orm";
import { userGhIntegrations, users } from "./schema/user";

export type User = InferModel<typeof users, "select">;
export type NewUser = InferModel<typeof users, "insert">;

export type UserGhIntegration = InferModel<typeof userGhIntegrations, "select">;
export type NewUserGhIntegration = InferModel<
  typeof userGhIntegrations,
  "insert"
>;
