import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { primaryKeys } from "@/db/utils";

import { projects } from "./index";

export const projectBuildSettings = pgTable("project_build_settings", {
  ...primaryKeys,
  projectId: uuid("project_id"),
  buildCommand: varchar("build_command"),
  outputDir: varchar("output_dir"),
  installCommand: varchar("install_command"),
  rootDirectory: varchar("root_directory"),
});

export const projectsBuildSettingsRelations = relations(
  projectBuildSettings,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectBuildSettings.projectId],
      references: [projects.id],
    }),
  })
);
