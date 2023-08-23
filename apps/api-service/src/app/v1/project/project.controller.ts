import { Request, Response } from "express";
import { inject, injectable } from "inversify";

import { CONTAINER_TYPES } from "@v1/shared/container/types";

import { ProjectService } from "./services/project.service";

@injectable()
export class ProjectController {
  constructor(
    @inject(CONTAINER_TYPES.ProjectService)
    private projectService: ProjectService
  ) {}

  async createProjectHandler(req: Request, res: Response) {
    await this.projectService.create(req.body);

    res.status(200).send({});
  }
}
