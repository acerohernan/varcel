import { Request, Response } from "express";
import { inject, injectable } from "inversify";

import { UnathorizedError } from "@/lib/errors";

import { CONTAINER_TYPES } from "@v1/shared/container/types";
import { JWTUser } from "@v1/shared/middlewares/verifyJwt";
import { ProjectService } from "./services/project.service";
import { DeploymentService } from "./services/deployment.service";

@injectable()
export class ProjectController {
  constructor(
    @inject(CONTAINER_TYPES.ProjectService)
    private projectService: ProjectService,
    @inject(CONTAINER_TYPES.DeploymentService)
    private deploymentService: DeploymentService
  ) {}

  async createProjectHandler(req: Request, res: Response) {
    const user: JWTUser = res.locals.user;

    if (!user) throw new UnathorizedError("Token malformed");

    await this.projectService.create({ ...req.body, userId: user.id });

    res.sendStatus(200);
  }

  async createDeploymentHandler(req: Request, res: Response) {
    const user: JWTUser = res.locals.user;

    if (!user) throw new UnathorizedError("Token malformed");

    const projectId = req.params["projectId"];

    await this.deploymentService.create({ projectId, userId: user.id });

    res.sendStatus(200);
  }
}
