export interface IProject {
  id: string;
  userId: string;
  name: string;
  subdomain: string;
  framework: string;
}

// TODO: Fetch the project and the latest deployment
// /project/:projectName
// /project/:projectName/deployments/latest
// /project/:projectName/deployments
// /project/:projectName/deployments/:deploymentId

export interface IProjectEnv {}
export interface ICreateProjectFormValues {
  projectName: string;
  projectSubdomain: string;
  framework: string;

  repository: {
    url: string;
    name: string;
    namespace: string;
    branch: string;
  };

  buildSettings: {
    outputDir: string;
    buildCommand: string;
    rootDirectory: string;
    installCommand: string;
  };

  env: { key: string; value: string }[];
}
