export interface IDeployment {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  status: string;
  environment: string;
  durationInSeconds: number;
  sourceGitBranch: string;
  sourceGitCommitSha: string;
  sourceGitCommitMessage: string;
  sourceGitCommitLink: string;
  buildLogs: string;
  screenshootUrl: string;
}
