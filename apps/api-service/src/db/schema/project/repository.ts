import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { primaryKeys } from "@/db/utils";

import { projects } from "./index";

export const projectRepositories = pgTable("project_repositories", {
  ...primaryKeys,
  projectId: uuid("project_id"),
  url: varchar("url"),
  name: varchar("name"),
  namespace: varchar("namespace"),
  branch: varchar("branch"),
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
