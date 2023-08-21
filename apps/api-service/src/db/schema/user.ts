import { pgTable, uuid, varchar, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { tiers } from "./tier";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email").unique(),
  username: varchar("username"),
  tierId: uuid("tier_id"),
});

export const usersRelations = relations(users, ({ one }) => ({
  tier: one(tiers, {
    fields: [users.tierId],
    references: [tiers.id],
  }),
  ghIntegration: one(userGhIntegrations, {
    fields: [users.id],
    references: [userGhIntegrations.userId],
  }),
}));

export const userGhIntegrations = pgTable("users_gh_integrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id"),
  ghUserId: integer("gh_user_id").unique(),
  ghInstallationId: integer("gh_installation_id"),
});

export const userGhIntegrationsRelations = relations(
  userGhIntegrations,
  ({ one }) => ({
    user: one(users, {
      fields: [userGhIntegrations.userId],
      references: [users.id],
    }),
  })
);
