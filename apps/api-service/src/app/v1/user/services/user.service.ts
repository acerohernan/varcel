import { injectable } from "inversify";
import { eq } from "drizzle-orm";
import axios from "axios";
import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";

import { logger } from "@/config/logger";
import { env } from "@/config/env";

import { db } from "@/db";
import { userGhIntegrations } from "@/db/schema/user";

import { BadRequestError } from "@/lib/errors";

import { getZodErrors } from "@v1/shared/lib/zod";

import {
  GetRepositoriesDTO,
  TGetRepositoriesDTO,
} from "../dtos/get-repositories.dto";
import {
  SetupGithubIntegrationDTO,
  TSetupGithubIntegrationDTO,
} from "../dtos/setup-gh-integration.dto";

@injectable()
export class UserService {
  constructor() {}

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
    const integration = await db.query.userGhIntegrations.findFirst({
      where: eq(userGhIntegrations.ghUserId, userGithubId),
    });

    if (!integration) return;

    // Save the integration id to the db
    await db
      .update(userGhIntegrations)
      .set({ ghInstallationId: installationId })
      .where(eq(userGhIntegrations.id, integration.id));
  }

  async getRepositories(
    dto: TGetRepositoriesDTO
  ): Promise<{ repositories: any[]; totalCount: number }> {
    const validation = GetRepositoriesDTO.safeParse(dto);

    if (!validation.success)
      throw new BadRequestError(getZodErrors(validation.error));

    const { userId, page, perPage } = dto;

    // Find user's github integration
    const integration = await db.query.userGhIntegrations.findFirst({
      where: eq(userGhIntegrations.userId, userId),
    });

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
}
