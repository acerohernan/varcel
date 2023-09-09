interface IProject {}

interface IProjectEnv {}
interface ICreateProjectFormValues {
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
    rootDirectory: string;
    buildCommand: string;
    outputDir: string;
    installCommand: string;
  };

  env: { key: string; value: string }[];
}
