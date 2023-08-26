import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { primaryKeys, timestamps } from "@/db/utils";

import { tiers } from "../tier";
import { userGhIntegrations } from "./gh-integration";
import { projects } from "../project";

export const users = pgTable("users", {
  ...primaryKeys,
  ...timestamps,
  email: varchar("email").unique(),
  username: varchar("username"),
  tierId: uuid("tier_id"),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  tier: one(tiers, {
    fields: [users.tierId],
    references: [tiers.id],
  }),
  ghIntegration: one(userGhIntegrations, {
    fields: [users.id],
    references: [userGhIntegrations.userId],
  }),
  projects: many(projects),
}));
