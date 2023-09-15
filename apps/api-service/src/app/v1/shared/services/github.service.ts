import { injectable } from "inversify";
import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/rest";

import { env } from "@/config/env";
import { logger } from "@/config/logger";

@injectable()
export class GithubService {
  private appOctokit: InstanceType<typeof Octokit>;

  constructor() {
    this.appOctokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: env.GITHUB_APP_ID,
        privateKey: env.GITHUB_APP_SECRET_KEY,
      },
    });
  }

  async createTokenFromInstallationId({
    installationId,
  }: {
    installationId: number;
  }): Promise<string | undefined> {
    try {
      const request = await this.appOctokit.apps.createInstallationAccessToken({
        installation_id: installationId,
      });

      const accessToken = request.data.token;

      if (!accessToken) return undefined;

      return accessToken;
    } catch (error) {
      logger.error(
        `Couldn't create and access token for the installation id <${installationId}>`
      );
      console.error(error);
      return undefined;
    }
  }

  async getLastestCommit({
    token,
    repoOwner,
    repoName,
    repoBranch,
  }: {
    token: string;
    repoName: string;
    repoOwner: string;
    repoBranch: string;
  }) {
    try {
      const octokit = new Octokit({ auth: token });

      const result = await octokit.repos.listCommits({
        owner: repoOwner,
        repo: repoName,
        sha: repoBranch,
        per_page: 1,
      });

      const commit = result.data[0];

      return commit;
    } catch (error) {
      logger.error(
        `Couldn't get the latest commit for repository with name <${repoName}> and from owner <${repoOwner}>`
      );
      console.log(error);
      return undefined;
    }
  }

  async getRepository({
    token,
    repoName,
    repoOwner,
  }: {
    token: string;
    repoName: string;
    repoOwner: string;
  }) {
    try {
      const octokit = new Octokit({ auth: token });

      const result = await octokit.repos.get({
        owner: repoOwner,
        repo: repoName,
      });

      return result;
    } catch (error) {
      logger.error(
        `Couldn't get the repository with name <${repoName}> from owner <${repoOwner}>`
      );
      console.log(error);
      return undefined;
    }
  }

  async listBranches({
    token,
    repoName,
    repoOwner,
    page,
    limit,
  }: {
    token: string;
    repoName: string;
    repoOwner: string;
    page: number;
    limit: number;
  }) {
    try {
      const octokit = new Octokit({ auth: token });

      const result = await octokit.repos.listBranches({
        owner: repoOwner,
        repo: repoName,
        page,
        per_page: limit,
      });

      return result;
    } catch (error) {
      logger.error(
        `Couldn't get the branches from repository with name <${repoName}> from owner <${repoOwner}>`
      );
      console.log(error);
      return undefined;
    }
  }
}
