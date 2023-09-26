import {
  NewProject,
  NewProjectBuildSettings,
  NewProjectEnvVariable,
  NewProjectRepository,
} from "@vercelclone/core/src/db/";
import { v4 as uuid } from "uuid";
import { inject, injectable } from "inversify";

import { BadRequestError, NotFoundError } from "@/lib/errors";

import { getZodErrors } from "@v1/shared/lib/zod";
import { CONTAINER_TYPES } from "@v1/shared/container/types";
import { GithubService } from "@v1/shared/services/github.service";
import { UserGhIntegrationRepository } from "@v1/user/repositories/user-gh-integration.repository";

import {
  CreateProjectDTO,
  TCreateProjectDTO,
} from "../dtos/create-project.dto";
import { GetProjectsDTO, TGetProjectsDTO } from "../dtos/get-projects.dto";
import { GetProjectDTO, TGetProjectDTO } from "../dtos/get-project.dto";

import { ProjectRepository } from "../repositories/project.repository";
import { DeploymentService } from "./deployment.service";

@injectable()
export class ProjectService {
  constructor(
    @inject(CONTAINER_TYPES.ProjectRepository)
    private projectRepository: ProjectRepository,
    @inject(CONTAINER_TYPES.DeploymentService)
    private deploymentService: DeploymentService,
    @inject(CONTAINER_TYPES.GithubService)
    private githubService: GithubService,
    @inject(CONTAINER_TYPES.UserGhIntegrationRepository)
    private userGhIntegrationRepository: UserGhIntegrationRepository
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

    // Validate that a project with the same name for user id dont exists
    const projectExists = await this.projectRepository.getByUserIdAndName({
      userId,
      projectName,
    });

    if (projectExists)
      throw new BadRequestError(
        `You have a project with the same name! Please change it`
      );

    // Verify that the subdomain is globally unique
    const projectSubdomainIsTaken =
      await this.projectRepository.getBySubdomain(projectSubdomain);

    if (projectSubdomainIsTaken)
      throw new BadRequestError(
        `The sudomain is taken, please choose another one!`
      );

    const newProject: NewProject = {
      id: uuid(),
      framework,
      userId,
      name: projectName,
      subdomain: projectSubdomain,
    };

    const repoName = repository.name;
    const repoOwner = repository.namespace?.split("/")[0];

    const newRepository: NewProjectRepository = {
      projectId: newProject.id!,
      ...repository,
      owner: repoOwner,
      name: repoName,
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

    const integration =
      await this.userGhIntegrationRepository.getByUserId(userId);

    if (!integration)
      throw new NotFoundError(
        `Your account hasn't configured a github integration yet!`
      );

    if (!integration.ghInstallationId)
      throw new NotFoundError(
        `You haven't installed the Latin Station's github app!`
      );

    const token = await this.githubService.createTokenFromInstallationId({
      installationId: integration.ghInstallationId,
    });

    if (!token)
      throw new BadRequestError(
        `Couldn't create an access token for your installation, check your installion in github and try again.`
      );

    await this.githubService.setupRepositoryWebhook({
      token,
      repoName,
      repoOwner,
    });

    const { deployment } = await this.deploymentService.create({
      userId,
      project: newProject,
      projectRepo: newRepository,
    });

    await this.projectRepository.create({
      project: newProject,
      repository: newRepository,
      buildSettings: newBuildSettings,
      envVariables: newEnvVariables,
      deployment,
    });

    return { deploymentId: deployment.id! };
  }

  async getProject(dto: TGetProjectDTO) {
    const validation = GetProjectDTO.safeParse(dto);

    if (!validation.success)
      throw new BadRequestError(getZodErrors(validation.error));

    const { userId, projectName } = dto;

    const project = await this.projectRepository.getByUserIdAndName({
      userId,
      projectName,
      withEntity: {
        lastDeployment: true,
      },
    });

    if (!project)
      throw new NotFoundError(`Project with name ${projectName} not found`);

    return project;
  }
}
