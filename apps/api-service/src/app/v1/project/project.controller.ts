import { Request, Response } from "express";
import { inject, injectable } from "inversify";

import { UnathorizedError } from "@/lib/errors";

import { CONTAINER_TYPES } from "@v1/shared/container/types";
import { JWTUser } from "@v1/shared/middlewares/verifyJwt";
import { IPaginatedMetadata } from "@v1/shared/lib/response";
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

  async getProjectsHandler(req: Request, res: Response) {
    const user: JWTUser = res.locals.user;

    if (!user) throw new UnathorizedError("Token malformed");

    let page = 1;
    let perPage = 5;

    const { projects, totalCount } = await this.projectService.getAll({
      userId: user.id,
      page,
      perPage,
    });

    const lastPage = Math.trunc(totalCount / perPage) + 1;

    const metadata: IPaginatedMetadata = {
      page,
      totalCount,
      lastPage,
      isLastPage: lastPage === page,
      nextPageExists: page < lastPage,
    };

    res.send({ projects, metadata });
  }

  async createProjectHandler(req: Request, res: Response) {
    const user: JWTUser = res.locals.user;

    if (!user) throw new UnathorizedError("Token malformed");

    const { deploymentId } = await this.projectService.create({
      ...req.body,
      userId: user.id,
    });

    res.send({ deploymentId });
  }

  async getProjectHandler(req: Request, res: Response) {
    const user: JWTUser = res.locals.user;

    if (!user) throw new UnathorizedError("Token malformed");

    const { projectName } = req.params;

    const project = await this.projectService.getProject({
      userId: user.id,
      projectName,
    });

    res.send({ project });
  }

  async getDeploymentsHandler(req: Request, res: Response) {
    const user: JWTUser = res.locals.user;

    if (!user) throw new UnathorizedError("Token malformed");

    const { projectName } = req.params;

    const deployments = await this.deploymentService.getDeployments({
      userId: user.id,
      projectName,
      page: 1,
      perPage: 5,
    });

    res.send({ deployments });
  }
}
