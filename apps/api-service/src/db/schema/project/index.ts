import { relations } from "drizzle-orm";
import { index, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { primaryKeys, timestamps } from "@/db/utils";

import { projectBuildSettings } from "./build-settings";
import { projectRepositories } from "./repository";
import { projectEnvVariables } from "./env-variables";
import { users } from "../user";
import { deployments } from "../deployment";
import { deploymentsCount } from "../deployment/count";
import { lastDeployments } from "../deployment/last-deployment";

export const projects = pgTable(
  "projects",
  {
    ...primaryKeys,
    ...timestamps,
    userId: uuid("user_id").notNull(),
    name: varchar("name").notNull(),
    subdomain: varchar("subdomain").unique().notNull(),
    framework: varchar("framework").notNull(),
  },
  (table) => {
    return {
      nameIdx: index("name_idx").on(table.name),
    };
  }
);

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
  deploymentsCount: one(deploymentsCount, {
    fields: [projects.id],
    references: [deploymentsCount.projectId],
  }),
  lastDeployment: one(lastDeployments, {
    fields: [projects.id],
    references: [lastDeployments.projectId],
  }),
}));
