export interface IGitServiceCloneParams {
  repoUrl: string;
  branch: string;
  commitSha: string;
  localPath: string;
  auth: any;
}

export interface IGitService {
  cloneRepository: (params: IGitServiceCloneParams) => Promise<void>;
}
