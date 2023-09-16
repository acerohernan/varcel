import { and, eq, sql } from "drizzle-orm";
import { injectable } from "inversify";

import { db } from "@/db";
import { deployments } from "@/db/schema/deployment";
import { Deployment, NewDeployment } from "@/db/types";
import { deploymentsCount } from "@/db/schema/deployment/count";
import { lastDeployments } from "@/db/schema/deployment/last-deployment";
import { projects } from "@/db/schema/project";

export interface IDeploymentRepository {
  create: (deployment: NewDeployment) => Promise<void>;
  getAll: (params: {
    userId: string;
    projectName: string;
    limit: number;
    offset: number;
  }) => Promise<Deployment[]>;
}

@injectable()
export class DeploymentRepository implements IDeploymentRepository {
  constructor() {}

  async create(deployment: NewDeployment) {
    return db.transaction(async (tx) => {
      await Promise.all([
        tx.insert(deployments).values(deployment),
        tx
          .update(deploymentsCount)
          .set({ totalCount: sql`${deploymentsCount.totalCount} + 1` })
          .where(eq(deploymentsCount.projectId, deployment.projectId)),
        tx
          .update(lastDeployments)
          .set({ deploymentId: deployment.id })
          .where(eq(lastDeployments.projectId, deployment.projectId)),
      ]);
    });
  }

  async getAll({
    userId,
    projectName,
    limit,
    offset,
  }: {
    userId: string;
    projectName: string;
    limit: number;
    offset: number;
  }) {
    const project = await db.query.projects.findFirst({
      where: and(eq(projects.userId, userId), eq(projects.name, projectName)),
    });

    if (!project) return [];

    return db
      .select()
      .from(deployments)
      .where(eq(deployments.projectId, project.id))
      .limit(limit)
      .offset(offset);
  }
}
