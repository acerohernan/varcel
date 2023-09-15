import { inject, injectable } from "inversify";
import { v4 as uuid } from "uuid";

import {
  NewDeployment,
  NewProject,
  NewProjectRepository,
  Project,
  ProjectRepository as DBProjectRepository,
} from "@/db/types";
import { BadRequestError, NotFoundError } from "@/lib/errors";

import { getZodErrors } from "@v1/shared/lib/zod";
import { CONTAINER_TYPES } from "@v1/shared/container/types";
import { GithubService } from "@v1/shared/services/github.service";
import { UserGhIntegrationRepository } from "@v1/user/repositories/user-gh-integration.repository";

import { DeploymentRepository } from "../repositories/deployment.repository";
import {
  CreateDeploymentDTO,
  TCreateDeploymentDTO,
} from "../dtos/create-deployment.dto";
import { ProjectRepository } from "../repositories/project.repository";

@injectable()
export class DeploymentService {
  constructor(
    @inject(CONTAINER_TYPES.DeploymentRepository)
    private deploymentRepository: DeploymentRepository,
    @inject(CONTAINER_TYPES.ProjectRepository)
    private projectRepository: ProjectRepository,
    @inject(CONTAINER_TYPES.UserGhIntegrationRepository)
    private userGhIntegrationRepository: UserGhIntegrationRepository,
    @inject(CONTAINER_TYPES.GithubService)
    private githubService: GithubService
  ) {}

  async createNew(dto: TCreateDeploymentDTO) {
    const validation = CreateDeploymentDTO.safeParse(dto);

    if (!validation.success)
      throw new BadRequestError(getZodErrors(validation.error));

    const { projectId, userId } = dto;

    const project = await this.projectRepository.getById(projectId);

    if (!project)
      throw new NotFoundError(`Not found a project with id ${projectId}`);

    const projectRepo = await this.projectRepository.getRepository(projectId);

    if (!projectRepo)
      throw new NotFoundError(
        `Not found a repository configured for project with id ${projectId}`
      );

    await this.create({ userId, project, projectRepo });
  }

  /**
   * @description Protected function to use only inside another service class, do not use it inside a controller. The fn to use
   * within controllers is `createNew`;
   */
  async create({
    userId,
    project,
    projectRepo,
  }: {
    userId: string;
    project: Project | NewProject;
    projectRepo: DBProjectRepository | NewProjectRepository;
  }) {
    const integration = await this.userGhIntegrationRepository.getByUserId(
      userId
    );

    if (!integration)
      throw new NotFoundError(
        `Your account hasn't configured a github integration yet!`
      );

    if (!integration.ghInstallationId)
      throw new NotFoundError(
        `You haven't installed the Latin Station's github app!`
      );

    //Get the latest commit for the configured branch in the repository

    const token = await this.githubService.createTokenFromInstallationId({
      installationId: integration.ghInstallationId,
    });

    if (!token)
      throw new BadRequestError(
        `Couldn't create an access token for your installation, check your installion in github and try again.`
      );

    const repoName = projectRepo.name;
    const repoOwner = projectRepo.namespace?.split("/")[0];
    const repoBranch = projectRepo.branch;

    const lastCommit = await this.githubService.getLastestCommit({
      token,
      repoName,
      repoOwner,
      repoBranch,
    });

    if (!lastCommit)
      throw new NotFoundError(
        `Couldn't find the latest commit for your repository <${repoName}>`
      );

    // Create the new deployment in database
    const newDeployment: NewDeployment = {
      id: uuid(),
      projectId: project.id!,
      status: "queued",
      sourceGitBranch: projectRepo.branch,
      sourceGitCommitSha: lastCommit.sha,
      sourceGitCommitLink: lastCommit.url,
      sourceGitCommitMessage: lastCommit.commit.message,
      environment: "development",
      buildLogs: "",
      durationInSeconds: 0,
      screenshootUrl: "",
    };

    console.log({ newDeployment });

    // Create the livekit room

    // Save the deployment to database
    await this.deploymentRepository.create(newDeployment);

    // Send the sqs event
  }
}
