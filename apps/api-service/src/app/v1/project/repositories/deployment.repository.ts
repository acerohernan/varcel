import { and, eq, sql } from "drizzle-orm";
import { injectable } from "inversify";
import {
  Deployment,
  NewDeployment,
  projects,
  deployments,
  deploymentsCount,
  lastDeployments,
} from "@vercelclone/core/src/db";

import { db } from "@/db";
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
