import { eq, sql } from "drizzle-orm";
import { injectable } from "inversify";

import { db } from "@/db";
import { NewDeployment } from "@/db/types";
import { deployments } from "@/db/schema/deployment";
import { deploymentsCount } from "@/db/schema/deployment/count";
import { lastDeployments } from "@/db/schema/deployment/last-deployment";

export interface IDeploymentRepository {
  create: (deployment: NewDeployment) => Promise<void>;
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
}
