export interface IGitServiceCloneParams {
  repoUrl: string;
  localPath: string;
  commitSha: string;
  auth: any;
}

export interface IGitService {
  cloneRepository: (params: IGitServiceCloneParams) => Promise<void>;
}
