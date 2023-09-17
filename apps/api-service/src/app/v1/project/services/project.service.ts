import { v4 as uuid } from "uuid";
import { inject, injectable } from "inversify";

import { BadRequestError, NotFoundError } from "@/lib/errors";
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
import { GetProjectDTO, TGetProjectDTO } from "../dtos/get-project.dto";

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

    const [projects, totalCount] = await Promise.all([
      this.projectRepository.getAll({
        userId,
        limit: 9,
        offset: 0,
      }),
      this.projectRepository.getTotalCount({ userId }),
    ]);

    return { projects, totalCount };
  }

  async create(dto: TCreateProjectDTO): Promise<{ deploymentId: string }> {
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

    // Validate that aq project with the same name for user id dont exists
    const projectExists = await this.projectRepository.getByUserIdAndName({
      userId,
      projectName,
    });

    if (projectExists)
      throw new BadRequestError(
        `You have a project with the same name! Please change it`
      );

    const newProject: NewProject = {
      id: uuid(),
      framework,
      userId,
      name: projectName,
      subdomain: projectSubdomain,
    };
    const newRepository: NewProjectRepository = {
      projectId: newProject.id!,
      ...repository,
    };
    const newBuildSettings: NewProjectBuildSettings = {
      projectId: newProject.id!,
      ...buildSettings,
    };
    const newEnvVariables: Array<NewProjectEnvVariable> = env.map(
      (variable) => ({
        id: uuid(),
        projectId: newProject.id!,
        ...variable,
      })
    );

    await this.projectRepository.create({
      project: newProject,
      repository: newRepository,
      buildSettings: newBuildSettings,
      envVariables: newEnvVariables,
    });

    const { deploymentId } = await this.deploymentService.create({
      userId,
      project: newProject,
      projectRepo: newRepository,
    });

    return { deploymentId };
  }

  async getProject(dto: TGetProjectDTO) {
    const validation = GetProjectDTO.safeParse(dto);

    if (!validation.success)
      throw new BadRequestError(getZodErrors(validation.error));

    const { userId, projectName } = dto;

    const project = await this.projectRepository.getByUserIdAndName({
      userId,
      projectName,
    });

    if (!project)
      throw new NotFoundError(`Project with name ${projectName} not found`);

    return project;
  }
}
