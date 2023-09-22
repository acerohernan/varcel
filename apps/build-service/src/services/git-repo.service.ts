import { IGitService, IGitServiceCloneParams } from "@/interfaces/services";

export class GithubService implements IGitService {
  constructor() {}

  async cloneRepository({
    auth: installationId,
    repoUrl,
    commitSha,
    localPath,
  }: IGitServiceCloneParams) {
    if (typeof installationId !== "number")
      throw new Error(`invalid instalation id ${installationId}`);

    // cd repo-to-clone
    // git clone --depth 3 --branch master --single-branch  --no-shallow-submodules https://github.com/cameronmcnz/rock-paper-scissors.git cloned-repository
    // cd repo-to-clone/cloned-repository
    // git reset --hard {commit-sha}
  }

  private getToken() {}
}
