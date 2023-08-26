import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { primaryKeys, timestamps } from "@/db/utils";

import { projectBuildSettings } from "./build-settings";
import { projectRepositories } from "./repository";
import { projectEnvVariables } from "./env-variables";
import { users } from "../user";
import { deployments } from "../deployment";

export const projects = pgTable("projects", {
  ...primaryKeys,
  ...timestamps,
  userId: uuid("user_id"),
  name: varchar("name"),
  subdomain: varchar("subdomain").unique(),
  framework: varchar("framework").unique(),
});

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
  buildSettings: one(projectBuildSettings, {
    fields: [projects.id],
    references: [projectBuildSettings.projectId],
  }),
  repository: one(projectRepositories, {
    fields: [projects.id],
    references: [projectRepositories.projectId],
  }),
  envVariables: many(projectEnvVariables),
  deployments: many(deployments),
}));
