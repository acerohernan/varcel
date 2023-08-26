import { primaryKeys, timestamps } from "@/db/utils";
import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { projects } from ".";

export const projectEnvVariables = pgTable("project_env_variables", {
  ...primaryKeys,
  ...timestamps,
  projectId: uuid("project_id"),
  key: varchar("key"),
  value: varchar("value"),
});

export const projectsBuildSettingsRelations = relations(
  projectEnvVariables,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectEnvVariables.projectId],
      references: [projects.id],
    }),
  })
);
