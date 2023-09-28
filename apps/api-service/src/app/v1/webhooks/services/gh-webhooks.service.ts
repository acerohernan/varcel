import crypto from "crypto";
import { inject, injectable } from "inversify";

import { env } from "@/config/env";
import { logger } from "@/config/logger";

import { BadRequestError, UnathorizedError } from "@/lib/errors";

import { getZodErrors } from "@v1/shared/lib/zod";
import { CONTAINER_TYPES } from "@v1/shared/container/types";

import { DeploymentService } from "@v1/project/services/deployment.service";
import { ProjectRepository } from "@v1/project/repositories/project.repository";

import { UserGhIntegrationRepository } from "@v1/user/repositories/user-gh-integration.repository";

import {
  GithubPushEventDTO,
  TGithubPushEventDTO,
} from "../dtos/github-push-event.dto";
import { GithubService } from "@v1/shared/services/github.service";

@injectable()
export class GithubWebhooksService {
  constructor(
    @inject(CONTAINER_TYPES.UserGhIntegrationRepository)
    private integrationRepository: UserGhIntegrationRepository,
    @inject(CONTAINER_TYPES.ProjectRepository)
    private projectRepository: ProjectRepository,
    @inject(CONTAINER_TYPES.DeploymentService)
    private deploymentService: DeploymentService,
    @inject(CONTAINER_TYPES.GithubService)
    private githubService: GithubService
  ) {}

  async verifySignature(requestSignature: string, requestBody: any) {
    const signature =
      "sha256=" +
      crypto
        .createHmac("sha256", env.GITHUB_WEBHOOK_SECRET)
        .update(JSON.stringify(requestBody))
        .digest("hex");

    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(requestSignature)
    );

    if (!isValid) throw new UnathorizedError(`Invalid signature`);

    logger.info("Signature were verified successfully!");
  }

  async pushEventHandler(dto: TGithubPushEventDTO) {
    const validation = GithubPushEventDTO.safeParse(dto);

    if (!validation.success) {
      const errors = getZodErrors(validation.error);
      logger.error(`Error validating github webhook push event, errors: `);
      console.log(errors);
      throw new BadRequestError(errors);
    }

    const {
      ref,
      after: lastCommitSha,
      installation: { id: installationId },
      repository: { full_name: repoNamespace },
    } = dto;

    const installation =
      await this.integrationRepository.getByGhInstallationId(installationId);

    console.log({ installation });

    if (!installation)
      throw new BadRequestError(
        `Not found user for installation ${installationId}`
      );

    const { userId } = installation!;
    const [repoOwner, repoName] = repoNamespace.split("/");

    const repositories =
      await this.projectRepository.getRepositoriesByOwnerAndName({
        owner: repoOwner,
        name: repoName,
        userId,
      });

    /* if (repositories.length === 0)
      throw new NotFoundError(
        `Not found a project connected with this repository!`
      ); */

    const [repoBranch] = ref.split("/").reverse();
    const commitSha = lastCommitSha;

    console.log(repositories, { repoBranch, commitSha });

    // Fetch the commit and create the internal functions
    const token = await this.githubService.createTokenFromInstallationId({
      installationId,
    });

    const commit = await this.githubService.getCommit({
      token,
      repoOwner,
      repoName,
      commitSha,
    });

    console.log({ commit });

    /* await Promise.all(
      repositories.map((r) =>
        this.deploymentService.createNew({
          projectId: r.projectId,
          userId,
          repoBranch,
          repoCommitSha,
        })
      )
    ); */
  }
}
