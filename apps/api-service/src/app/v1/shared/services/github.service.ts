import { injectable } from "inversify";
import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/rest";

import { env } from "@/config/env";
import { logger } from "@/config/logger";

@injectable()
export class GithubService {
  appOctokit: InstanceType<typeof Octokit>;

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
  }: {
    token: string;
    repoName: string;
    repoOwner: string;
  }) {
    try {
      const octokit = new Octokit({ auth: token });

      const result = await octokit.repos.listCommits({
        owner: repoOwner,
        repo: repoName,
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
}
