import path from "path";
import { spawn } from "child_process";

import {
  IDeploymentRepository,
  IProjectRepository,
  IUserRepository,
} from "./interfaces/repositories";

import { GithubService } from "./services/git-repo.service";
import { IGitService } from "./interfaces/services";

interface InitParams {
  deploymentId: string;
  userId: string;
}

export class BuildProcess {
  constructor(
    private userRepository: IUserRepository,
    private deploymentRepository: IDeploymentRepository,
    private projectRepository: IProjectRepository,
    private gitService: IGitService
  ) {}

  async init(params: InitParams): Promise<void> {
    const { userId, deploymentId } = params;

    const user = await this.userRepository.getById(userId);

    if (!user) throw new Error(`couldn't find user with id ${userId}`);

    const deployment = await this.deploymentRepository.getById(deploymentId);

    if (!deployment)
      throw new Error(`couldn't find deloyment with id ${deploymentId}`);

    try {
      await this.deploymentRepository.update(deployment.id, {
        status: "building",
      });

      const integration = await this.userRepository.getGhIntegration(user.id);

      if (!integration)
        throw new Error(
          `couldn't find gh integration for user with id ${userId}`
        );

      if (!integration.ghInstallationId)
        throw new Error(
          `gh integration for user with id ${userId} don't have a gh installation id`
        );

      const repoName = "livekit-whiteboard";
      const repoOwner = "acerohernan";
      const commitSha = "e47202079d84c6fe295249e4a8e18877ac5a874e";
      const repoUrl = `https://github.com/${repoOwner}/${repoName}.git`;

      const localPath = path.resolve(
        __dirname,
        "..",
        `tmp/${repoOwner}/${repoName}/${commitSha}`
      );

      await this.gitService.cloneRepository({
        repoUrl,
        commitSha,
        localPath,
        auth: integration.ghInstallationId,
      });

      const { projectId } = deployment;

      const project = await this.projectRepository.getById(projectId);

      if (!project)
        throw new Error(
          `couldn't find project with id ${projectId} for deployment ${deploymentId}`
        );

      const buildSettings =
        await this.projectRepository.getBuildSettings(projectId);

      if (!buildSettings)
        throw new Error(
          `couldn't find project build settings for project ${projectId}`
        );

      await this.createDeploymentBundle({
        codePath: localPath,
        ...buildSettings,
      });

      /* Try in local to this */

      // Upload to S3

      // Update cloudfront rules

      // Update deployment status to success
    } catch (error) {
      // Error handling
    }
  }

  private async createDeploymentBundle({
    codePath,
  }: {
    codePath: string;
    buildCommand: string;
    outputDir: string;
    installCommand: string;
    rootDirectory: string;
  }) {
    const commands = ["yarn install", "yarn build"];

    await new Promise<void>((resolve, reject) => {
      const child = spawn(commands.join(" && "), {
        shell: true,
        cwd: codePath,
      });

      child.stderr.on("data", (data) => {
        console.error("STDERR:", data.toString());
      });

      child.stdout.on("data", (data) => {
        console.log("STDOUT:", data.toString());
      });

      child.on("exit", (exitCode) => {
        console.log("Child exited with code: " + exitCode);
        resolve();
      });
    });

    // Make bundle
    // Stop streaming logs
  }
}
