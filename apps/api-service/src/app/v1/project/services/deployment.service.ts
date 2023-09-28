import { inject, injectable } from "inversify";
import { v4 as uuid } from "uuid";

import {
  NewDeployment,
  NewProject,
  NewProjectRepository,
  Project,
  ProjectRepository as DBProjectRepository,
} from "@vercelclone/core/src/db/";
import { BadRequestError } from "@/lib/errors";

import { getZodErrors } from "@v1/shared/lib/zod";
import { CONTAINER_TYPES } from "@v1/shared/container/types";
import { GithubService } from "@v1/shared/services/github.service";
import { RealtimeService } from "@v1/shared/services/realtime.service";

import { DeploymentRepository } from "../repositories/deployment.repository";
import {
  GetDeploymentsDTO,
  TGetDeploymentsDTO,
} from "../dtos/get-deployments.dto";

interface ICreateDeploymentParams {
  userId: string;
  project: Project | NewProject;
  projectRepo: DBProjectRepository | NewProjectRepository;
  branch: string;
  commitSha: string;
  commitMessage: string;
}

@injectable()
export class DeploymentService {
  constructor(
    @inject(CONTAINER_TYPES.DeploymentRepository)
    private deploymentRepository: DeploymentRepository,
    @inject(CONTAINER_TYPES.GithubService)
    private githubService: GithubService,
    @inject(CONTAINER_TYPES.RealtimeService)
    private realtimeService: RealtimeService
  ) {}

  async createByWebhookEvent(params: ICreateDeploymentParams) {
    const { deployment } = await this.create(params);

    await this.deploymentRepository.create(deployment);

    // TODO: send queue event
  }

  async createByNewProject(params: ICreateDeploymentParams) {
    const { deployment } = await this.create(params);

    // The projectService will be in charged of save the deployment in db and send the message to the queue
    return { deployment };
  }

  /**
   * @description Private function for create all utilities for a new deployment without save it in db, to use only inside this class, do not make it public. This function is used in the function 'createByWebhookEvent' and 'createByNewProject'. If you have a new use case, create another public function and use this inside.
   * @returns New deployment entity ready to be saved in db.
   */
  private async create({
    project,
    projectRepo,
    branch,
    commitSha,
    commitMessage,
  }: ICreateDeploymentParams): Promise<{ deployment: NewDeployment }> {
    const { owner, name } = projectRepo;

    // TODO: Create the realtime room to send the build logs

    // Create the new deployment for database
    const newDeployment: NewDeployment = {
      id: uuid(),
      projectId: project.id!,
      status: "queued",
      sourceGitBranch: branch,
      sourceGitCommitSha: commitSha,
      sourceGitCommitLink: `https://github.com/${owner}/${name}/commit/${commitSha}`,
      sourceGitCommitMessage: commitMessage,
      environment: "development",
      buildLogs: "",
      durationInSeconds: 0,
      screenshootUrl: "",
      buildRoomId: null,
    };

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
