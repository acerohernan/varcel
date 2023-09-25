import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";

import { logger } from "./config/logger";

import {
  IDeploymentRepository,
  IProjectRepository,
  IUserRepository,
} from "./interfaces/repositories";
import { IBundlerService, IGitService } from "./interfaces/services";

interface InitParams {
  deploymentId: string;
  userId: string;
}

export class BuildProcess {
  constructor(
    private userRepo: IUserRepository,
    private deploymentRepo: IDeploymentRepository,
    private projectRepo: IProjectRepository,
    private gitSvc: IGitService,
    private bundlerSvc: IBundlerService
  ) {}

  async init(params: InitParams): Promise<void> {
    const { userId, deploymentId } = params;

    const user = await this.userRepo.getById(userId);

    if (!user) throw new Error(`couldn't find user with id ${userId}`);

    const deployment = await this.deploymentRepo.getById(deploymentId);

    if (!deployment)
      throw new Error(`couldn't find deployment with id ${deploymentId}`);

    const { projectId, sourceGitBranch, sourceGitCommitSha } = deployment;

    const repository = await this.projectRepo.getGitRepository(projectId);

    if (!repository)
      throw new Error(
        `couldn't find project repository with for project ${projectId}`
      );

    const { namespace } = repository;

    const repoUrl = `https://github.com/${namespace}.git`;

    const tmpPath = path.resolve(
      __dirname,
      "..",
      `tmp/${namespace}/${sourceGitCommitSha}`
    );

    try {
      await this.deploymentRepo.update(deployment.id, {
        status: "building",
      });

      const integration = await this.userRepo.getGhIntegration(user.id);

      if (!integration)
        throw new Error(
          `couldn't find gh integration for user with id ${userId}`
        );

      if (!integration.ghInstallationId)
        throw new Error(
          `gh integration for user with id ${userId} don't have a gh installation id`
        );

      const folderExists = fs.existsSync(tmpPath);

      if (folderExists) throw new Error(`folder in ${tmpPath} already exists`);

      await this.gitSvc.cloneRepository({
        repoUrl,
        branch: sourceGitBranch,
        commitSha: sourceGitCommitSha,
        localPath: tmpPath,
        auth: integration.ghInstallationId,
      });

      logger.info(`repository from ${repoUrl} has been cloned!`);

      const buildSettings = await this.projectRepo.getBuildSettings(projectId);

      if (!buildSettings)
        throw new Error(
          `couldn't find project build settings for project ${projectId}`
        );

      const { bundlePath } = await this.bundlerSvc.bundle({
        codePath: tmpPath,
        ...buildSettings,
      });

      logger.info(`build successfully completed! bundle folder ${bundlePath}`);

      // Provisionary
      const s3Path = path.resolve(
        __dirname,
        "..",
        "tmp/s3",
        namespace,
        sourceGitCommitSha
      );

      await fsPromises.cp(bundlePath, s3Path, { recursive: true });

      logger.info(`build successfully copied to s3!`);

      await fsPromises.rm(tmpPath, { force: true, recursive: true });

      logger.info(`source code successfully deleted!`);
    } catch (error) {
      logger.error(`error happened at executing the build process!`);

      console.log(error);

      const folderExists = fs.existsSync(tmpPath);

      if (folderExists)
        await fsPromises.rm(tmpPath, { force: true, recursive: true });

      logger.info(`deployment folder deleted successfully!`);
    }
  }
}
