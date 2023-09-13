import { relations } from "drizzle-orm";
import { integer, pgTable, uuid } from "drizzle-orm/pg-core";

import { projects } from "../project";
import { primaryKeys } from "../../utils";

export const deploymentsCount = pgTable("deployments_count", {
  ...primaryKeys,
  projectId: uuid("user_id").unique().notNull(),
  totalCount: integer("total_count").default(0).notNull(),
});

export const deploymentsCountRelations = relations(
  deploymentsCount,
  ({ one }) => ({
    project: one(projects, {
      fields: [deploymentsCount.projectId],
      references: [projects.id],
    }),
  })
);
