import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { primaryKeys } from "@/db/utils";

import { projects } from "./index";

export const projectRepositories = pgTable("project_repositories", {
  ...primaryKeys,
  projectId: uuid("project_id").unique().notNull(),
  url: varchar("url").notNull(),
  name: varchar("name").notNull(),
  namespace: varchar("namespace").notNull(),
  branch: varchar("branch").notNull(),
});

export const projectRepositoriesRelations = relations(
  projectRepositories,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectRepositories.projectId],
      references: [projects.id],
    }),
  })
);
