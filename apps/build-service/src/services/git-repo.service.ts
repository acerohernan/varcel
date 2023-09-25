import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";

import { env } from "@/config/env";
import { IGitService, IGitServiceCloneParams } from "@/interfaces/services";
import { logger } from "@/config/logger";
import { spawn } from "child_process";

interface GithubCloneParams extends IGitServiceCloneParams {
  auth: number;
}

export class GithubService implements IGitService {
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

  async cloneRepository({
    auth: installationId,
    repoUrl,
    branch,
    commitSha,
    localPath,
  }: GithubCloneParams) {
    if (typeof installationId !== "number")
      throw new Error(`invalid instalation id ${installationId}`);

    const token = await this.getAccessToken(installationId);

    console.log({ token });

    const command = `git clone --depth 3 --branch ${branch} --single-branch  --no-shallow-submodules ${repoUrl} ${localPath} && cd ${localPath} && git reset --hard ${commitSha}`;

    await new Promise<void>((resolve, reject) => {
      const child = spawn(command, { shell: true });

      child.stderr.on("data", (data) => {
        console.error("STDERR:", data.toString());
      });

      child.stdout.on("data", (data) => {
        console.log("STDOUT:", data.toString());
      });

      child.on("exit", (code) => {
        logger.info(`clone repository child process exited with code ${code}`);
        resolve();
      });
    });
  }

  private async getAccessToken(installationId: number): Promise<string> {
    try {
      const result = await this.appOctokit.apps.createInstallationAccessToken({
        installation_id: installationId,
      });

      const accessToken = result.data.token;

      if (!accessToken)
        throw Error(
          `access token for installation id ${installationId} couldn't be created!`
        );

      return accessToken;
    } catch (error) {
      logger.error(
        `error at getting access token for github installation id ${installationId}`
      );
      throw error;
    }
  }
}
