import { v4 as uuid } from "uuid";
import { inject, injectable } from "inversify";

import { BadRequestError } from "@/lib/errors";
import {
  NewProject,
  NewProjectBuildSettings,
  NewProjectEnvVariable,
  NewProjectRepository,
} from "@/db/types";

import { CONTAINER_TYPES } from "@v1/shared/container/types";
import { getZodErrors } from "@v1/shared/lib/zod";

import { ProjectRepository } from "../repositories/project.repository";

import {
  CreateProjectDTO,
  TCreateProjectDTO,
} from "../dtos/create-project.dto";
import { GetProjectsDTO, TGetProjectsDTO } from "../dtos/get-projects.dto";
import { DeploymentService } from "./deployment.service";

@injectable()
export class ProjectService {
  constructor(
    @inject(CONTAINER_TYPES.ProjectRepository)
    private projectRepository: ProjectRepository,
    @inject(CONTAINER_TYPES.DeploymentService)
    private deploymentService: DeploymentService
  ) {}

  async getAll(
    dto: TGetProjectsDTO
  ): Promise<{ projects: any[]; totalCount: number }> {
    const validation = GetProjectsDTO.safeParse(dto);

    if (!validation.success)
      throw new BadRequestError(getZodErrors(validation.error));

    const { page, perPage, userId } = dto;

    const { projects, totalCount } = await this.projectRepository.getAll({
      userId,
    });

    return { projects, totalCount };
  }

  async create(dto: TCreateProjectDTO): Promise<void> {
    const validation = CreateProjectDTO.safeParse(dto);

    if (!validation.success)
      throw new BadRequestError(getZodErrors(validation.error));

    const {
      userId,
      projectName,
      framework,
      projectSubdomain,
      env,
      repository,
      buildSettings,
    } = dto;

    const newProject: NewProject = {
      id: uuid(),
      framework,
      userId,
      name: projectName,
      subdomain: projectSubdomain,
    };
    const newRepository: NewProjectRepository = {
      projectId: newProject.id,
      ...repository,
    };
    const newBuildSettings: NewProjectBuildSettings = {
      projectId: newProject.id,
      ...buildSettings,
    };
    const newEnvVariables: Array<NewProjectEnvVariable> = env.map(
      (variable) => ({
        id: uuid(),
        projectId: newProject.id,
        ...variable,
      })
    );

    await this.projectRepository.create({
      project: newProject,
      repository: newRepository,
      buildSettings: newBuildSettings,
      envVariables: newEnvVariables,
    });

    await this.deploymentService.create({ projectId: newProject.id!, userId });
  }
}
