import { UserRepository } from "./repositories/user.repository";
import { ProjectRepository } from "./repositories/project.repository";
import { DeploymentRepository } from "./repositories/deployment.repository";

import { GithubService } from "./services/git-repo.service";
import { BuildProcess } from "./build";

async function main() {
  try {
    const userRepo = new UserRepository();
    const deployRepo = new DeploymentRepository();
    const projectRepo = new ProjectRepository();
    const gitSvc = new GithubService();

    const process = new BuildProcess(userRepo, deployRepo, projectRepo, gitSvc);

    const userId = "cf65100b-e43e-40a9-a837-00f8bacb560c";
    const deploymentId = "36e4a09c-1b60-4d64-bec1-e280aec96c12";

    process.init({
      userId,
      deploymentId,
    });
  } catch (error) {
    console.error(error);
  }
}

main();
