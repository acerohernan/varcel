import { inject, injectable } from "inversify";

import { BadRequestError, NotFoundError } from "@/lib/errors";

import { CONTAINER_TYPES } from "@v1/shared/container/types";
import { getZodErrors } from "@v1/shared/lib/zod";

import { DeploymentRepository } from "../repositories/deployment.repository";
import {
  CreateDeploymentDTO,
  TCreateDeploymentDTO,
} from "../dtos/create-deployment.dto";
import { ProjectRepository } from "../repositories/project.repository";
import { NewDeployment } from "@/db/types";
import { v4 as uuid } from "uuid";

@injectable()
export class DeploymentService {
  constructor(
    @inject(CONTAINER_TYPES.DeploymentRepository)
    private deploymentRepository: DeploymentRepository,
    @inject(CONTAINER_TYPES.ProjectRepository)
    private projectRepository: ProjectRepository
  ) {}

  async create(dto: TCreateDeploymentDTO) {
    const validation = CreateDeploymentDTO.safeParse(dto);

    if (!validation.success)
      throw new BadRequestError(getZodErrors(validation.error));

    const { projectId } = dto;

    const project = await this.projectRepository.getById(projectId);

    if (!project)
      throw new NotFoundError(`Not found a project with id ${projectId}`);

    const projectRepository = await this.projectRepository.getRepository(
      projectId
    );

    if (!projectRepository)
      throw new NotFoundError(
        `Not found a repository configured for project with id ${projectId}`
      );

    //Get the latest commit for the configured branch in the repository

    // Create the new deployment in database
    const newDeployment: NewDeployment = {
      id: uuid(),
      projectId,
      status: "queued",
      sourceGitBranch: projectRepository.branch,
      /* sourceGitCommit: projectRepository., */
      environment: "development",
    };

    // Create the livekit room

    // Save the deployment to database
    await this.deploymentRepository.create(newDeployment);

    // Send the sqs event
  }
}
