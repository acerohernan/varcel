import { injectable } from "inversify";

import { db } from "@/db";
import { NewDeployment } from "@/db/types";
import { deployments } from "@/db/schema/deployment";

export interface IDeploymentRepository {
  create: (deployment: NewDeployment) => Promise<void>;
}

@injectable()
export class DeploymentRepository implements IDeploymentRepository {
  constructor() {}

  async create(deployment: NewDeployment) {
    await db.insert(deployments).values(deployment);
  }
}
