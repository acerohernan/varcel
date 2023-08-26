import { relations } from "drizzle-orm";
import { pgTable, uuid, integer } from "drizzle-orm/pg-core";

import { primaryKeys, timestamps } from "@/db/utils";

import { users } from "./index";

export const userGhIntegrations = pgTable("users_gh_integrations", {
  ...primaryKeys,
  ...timestamps,
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
