import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { tiers } from "./tier";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email").unique(),
  username: varchar("username"),
  tierId: uuid("tier_id"),
});

export const usersRelations = relations(users, ({ one }) => ({
  tier: one(tiers, {
    fields: [users.id],
    references: [tiers.id],
  }),
}));
