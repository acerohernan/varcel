import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

import { primaryKeys } from "../../utils";
import { projects } from "../project";
import { deployments } from ".";

export const lastDeployments = pgTable("last_deployments", {
  ...primaryKeys,
  projectId: uuid("project_id").unique().notNull(),
  deploymentId: uuid("deployment_id"),
});

export const lastDeploymentsRelations = relations(
  lastDeployments,
  ({ one }) => ({
    project: one(projects, {
      fields: [lastDeployments.projectId],
      references: [projects.id],
    }),
    deployment: one(deployments, {
      fields: [lastDeployments.deploymentId],
      references: [deployments.id],
    }),
  })
);
