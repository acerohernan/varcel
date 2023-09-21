import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { primaryKeys, timestamps } from "../../utils";

import { tiers } from "../tier";
import { userGhIntegrations } from "./gh-integration";
import { projects } from "../project";
import { projectsCount } from "../project/count";

export const users = pgTable("users", {
  ...primaryKeys,
  ...timestamps,
  email: varchar("email").unique().notNull(),
  username: varchar("username").notNull(),
  tierId: uuid("tier_id").notNull(),
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
  projectsCount: one(projectsCount, {
    fields: [users.id],
    references: [projectsCount.userId],
  }),
}));

export * from "./gh-integration";
