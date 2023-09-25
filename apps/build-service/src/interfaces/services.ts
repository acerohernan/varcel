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

export interface IBundlerServiceCreateBundle {
  codePath: string;
  buildCommand: string;
  outputDir: string;
  installCommand: string;
  rootDirectory: string;
}

export interface IBundlerService {
  bundle: (
    params: IBundlerServiceCreateBundle
  ) => Promise<{ bundlePath: string }>;
}
