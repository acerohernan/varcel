import { eq } from "drizzle-orm";
import { Deployment, deployments } from "@vercelclone/core/src/db";

import { db } from "@/db";
import { IDeploymentRepository } from "@/interfaces/repositories";

export class DeploymentRepository implements IDeploymentRepository {
  async getById(deploymentId: string): Promise<Deployment | undefined> {
    return db.query.deployments.findFirst({
      where: eq(deployments.id, deploymentId),
    });
  }

  async update(deploymentId: string, body: Partial<Deployment>): Promise<void> {
    await db
      .update(deployments)
      .set(body)
      .where(eq(deployments.id, deploymentId));
  }
}
