import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { primaryKeys } from "../../utils";
import { relations } from "drizzle-orm";
import { users } from "../user";

export const projectsCount = pgTable("projects_count", {
  ...primaryKeys,
  userId: uuid("user_id").unique().notNull(),
  totalCount: integer("total_count").default(0).notNull(),
});

export const projectsBuildSettingsRelations = relations(
  projectsCount,
  ({ one }) => ({
    user: one(users, {
      fields: [projectsCount.userId],
      references: [users.id],
    }),
  })
);
