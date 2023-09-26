import axios from "axios";
import { Octokit } from "@octokit/rest";
import { inject, injectable } from "inversify";
import { createAppAuth } from "@octokit/auth-app";

import { env } from "@/config/env";
import { logger } from "@/config/logger";

import { BadRequestError, NotFoundError } from "@/lib/errors";

import { getZodErrors } from "@v1/shared/lib/zod";
import { CONTAINER_TYPES } from "@v1/shared/container/types";
import { GithubService } from "@v1/shared/services/github.service";
import { UserRepository } from "@v1/shared/repositories/user.repository";
import { ProjectRepository } from "@v1/project/repositories/project.repository";
import { DeploymentService } from "@v1/project/services/deployment.service";

import {
  GetRepositoriesDTO,
  TGetRepositoriesDTO,
} from "../dtos/get-repositories.dto";
import {
  SetupGithubIntegrationDTO,
  TSetupGithubIntegrationDTO,
} from "../dtos/setup-gh-integration.dto";
import {
  GetRepositoryDTO,
  TGetRepositoryDTO,
} from "../dtos/get-repository.dto";
import {
  GithubRepositoryWebhookDTO,
  TGithubRepositoryWebhookDTO,
} from "../dtos/github-repository-webhook.dto";
import { GetUserDTO, TGetUserDTO } from "../dtos/get-user.dto";
import { UserGhIntegrationRepository } from "../repositories/user-gh-integration.repository";

@injectable()
export class UserService {
  constructor(
    @inject(CONTAINER_TYPES.UserRepository)
    private userRepository: UserRepository,
    @inject(CONTAINER_TYPES.UserGhIntegrationRepository)
    private integrationRepository: UserGhIntegrationRepository,
    @inject(CONTAINER_TYPES.GithubService)
    private githubService: GithubService,
    @inject(CONTAINER_TYPES.ProjectRepository)
    private projectRepository: ProjectRepository,
    @inject(CONTAINER_TYPES.DeploymentService)
    private deploymentService: DeploymentService
  ) {}

  async getInformation(dto: TGetUserDTO) {
    const validation = GetUserDTO.safeParse(dto);

    if (!validation.success)
      throw new BadRequestError(getZodErrors(validation.error));

    const { userId } = dto;

    const user = await this.userRepository.getById(userId);

    if (!user)
      throw new NotFoundError(`Couldn't find a user with id ${userId}`);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  async setupGithubIntegration(dto: TSetupGithubIntegrationDTO): Promise<void> {
    const validation = SetupGithubIntegrationDTO.safeParse(dto);

    if (!validation.success)
      throw new BadRequestError(getZodErrors(validation.error));

    const { code, installationId } = dto;

    const params = new URLSearchParams({
      client_id: env.GITHUB_APP_CLIENT_ID,
      client_secret: env.GITHUB_APP_CLIENT_SECRET,
      code,
    });

    const url = `https://github.com/login/oauth/access_token?${params.toString()}`;
    const response = await axios.post(url, null);
    const data = response.data as string;

    if (response.status !== 200)
      throw new BadRequestError("Error at getting access token from github");

    const token = data.split("&")[0].replace("access_token=", "");

    if (!token)
      throw new BadRequestError("Error at getting access token from github");

    const octokit = new Octokit({ auth: token });

    const request = await octokit.users.getAuthenticated();

    const userGithubId = request.data.id;

    // Query a user with the same github id
    const integration =
      await this.integrationRepository.getByGhId(userGithubId);

    if (!integration) return;

    // Update the record with the installation_id
    await this.integrationRepository.update(integration.id, {
      ghInstallationId: installationId,
    });
  }

  async getRepositories(
    dto: TGetRepositoriesDTO
  ): Promise<{ repositories: any[]; totalCount: number }> {
    const validation = GetRepositoriesDTO.safeParse(dto);

    if (!validation.success)
      throw new BadRequestError(getZodErrors(validation.error));

    const { userId, page, perPage } = dto;

    // Find user's github integration
    const integration = await this.integrationRepository.getByUserId(userId);

    if (!integration || !integration.ghInstallationId)
      return { repositories: [], totalCount: 0 };

    // Get the repositories for installitation
    const octokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: env.GITHUB_APP_ID,
        privateKey: env.GITHUB_APP_SECRET_KEY,
        installationId: integration.ghInstallationId,
      },
    });

    try {
      const request = await octokit.apps.listReposAccessibleToInstallation({
        page,
        per_page: perPage,
      });
      const repositories = request.data.repositories;
      const totalCount = request.data.total_count;

      return { repositories, totalCount };
    } catch (error) {
      logger.error(
        `Error at retrieving repositories for installation id ${integration.ghInstallationId}`
      );
      console.error(error);
      return { repositories: [], totalCount: 0 };
    }
  }

  async getRepository(dto: TGetRepositoryDTO) {
    const validation = GetRepositoryDTO.safeParse(dto);

    if (!validation.success)
      throw new BadRequestError(getZodErrors(validation.error));

    const { userId, repoOwner, repoName } = dto;

    const ghIntegration = await this.integrationRepository.getByUserId(userId);

    if (!ghIntegration || !ghIntegration.ghInstallationId)
      throw new BadRequestError(
        `You don't have a github integration settuped!`
      );

    const { ghInstallationId } = ghIntegration;

    const token = await this.githubService.createTokenFromInstallationId({
      installationId: ghInstallationId,
    });

    if (!token)
      throw new BadRequestError(`Your github integration cannot be used!`);

    const result = await this.githubService.getRepository({
      token,
      repoName,
      repoOwner,
    });

    if (!result || !result.data)
      throw new NotFoundError(
        `The repository not exists or you're not allowed to access it!`
      );

    return result.data;
  }

  async handleGhRepositoryWebhook(dto: TGithubRepositoryWebhookDTO) {
    const validation = GithubRepositoryWebhookDTO.safeParse(dto);

    if (!validation.success) {
      const errors = getZodErrors(validation.error);
      logger.error(
        `Error validating github repository webhook request, errors: `
      );
      console.log(errors);
      throw new BadRequestError(errors);
    }
    const {
      installation: { id: installationId },
      repository: { full_name: repoNamespace },
    } = dto;

    const installation =
      await this.integrationRepository.getByGhId(installationId);

    if (!installation)
      throw new BadRequestError(
        `Not found user for installation ${installationId}`
      );

    const { userId } = installation;
    const [owner, name] = repoNamespace.split("/");

    const repositories =
      await this.projectRepository.getRepositoriesByOwnerAndName({
        owner,
        name,
        userId,
      });

    if (repositories.length === 0)
      throw new NotFoundError(
        `Not found a project connected with this repository!`
      );

    // await this.deploymentService.createNew({projectId: projectId, userId});
  }
}
