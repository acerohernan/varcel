import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { primaryKeys } from "../../utils";

import { projects } from "./index";

export const projectBuildSettings = pgTable("project_build_settings", {
  ...primaryKeys,
  projectId: uuid("project_id").unique().notNull(),
  buildCommand: varchar("build_command").notNull(),
  outputDir: varchar("output_dir").notNull(),
  installCommand: varchar("install_command").notNull(),
  rootDirectory: varchar("root_directory").notNull(),
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
