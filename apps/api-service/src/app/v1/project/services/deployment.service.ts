import { inject, injectable } from "inversify";
import { v4 as uuid } from "uuid";

import {
  NewDeployment,
  NewProject,
  NewProjectRepository,
  Project,
  ProjectRepository as DBProjectRepository,
} from "@vercelclone/core/src/db/";
import { BadRequestError, NotFoundError } from "@/lib/errors";

import { getZodErrors } from "@v1/shared/lib/zod";
import { CONTAINER_TYPES } from "@v1/shared/container/types";
import { GithubService } from "@v1/shared/services/github.service";
import { RealtimeService } from "@v1/shared/services/realtime.service";
import { UserGhIntegrationRepository } from "@v1/user/repositories/user-gh-integration.repository";

import { DeploymentRepository } from "../repositories/deployment.repository";
import {
  CreateDeploymentDTO,
  TCreateDeploymentDTO,
} from "../dtos/create-deployment.dto";
import { ProjectRepository } from "../repositories/project.repository";
import {
  GetDeploymentsDTO,
  TGetDeploymentsDTO,
} from "../dtos/get-deployments.dto";

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
    private githubService: GithubService,
    @inject(CONTAINER_TYPES.RealtimeService)
    private realtimeService: RealtimeService
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

    const { deployment } = await this.create({ userId, project, projectRepo });

    await this.deploymentRepository.create(deployment);
  }

  /**
   * @description Protected function for create all utilities for a new deployment without save it in db, to use only inside another service class, do not use it inside a controller. The fn to use within controllers is `createNew`.
   * @returns New deployment entity ready to be saved in db.
   */
  async create({
    userId,
    project,
    projectRepo,
  }: {
    userId: string;
    project: Project | NewProject;
    projectRepo: DBProjectRepository | NewProjectRepository;
  }): Promise<{ deployment: NewDeployment }> {
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

    // Create the realtime room for build logs
    /* const { roomId } = await this.realtimeService.createRoom({
      roomName: uuid(),
    }); */

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
      buildRoomId: null,
    };

    // Send the sqs event

    // return the new deployment
    return { deployment: newDeployment };
  }

  async getDeployments(dto: TGetDeploymentsDTO) {
    const validation = GetDeploymentsDTO.safeParse(dto);

    if (!validation.success)
      throw new BadRequestError(getZodErrors(validation.error));

    const { userId, projectName, page, perPage } = dto;

    return this.deploymentRepository.getAll({
      userId,
      projectName,
      limit: 4,
      offset: 0,
    });
  }
}
