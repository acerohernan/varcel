import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

import { primaryKeys } from "../../utils";
import { projects } from "../project";
import { deployments } from ".";

export const lastDeployments = pgTable("last_deployments", {
  ...primaryKeys,
  projectId: uuid("user_id").unique().notNull(),
  deploymentId: uuid("user_id").notNull(),
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
