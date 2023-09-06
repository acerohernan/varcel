export const PROJECT_PLACEHOLDER = ":projectName";
export const DEPLOYMENT_PLACEHOLDER = ":deploymentId";

export enum ROUTES {
  LOGIN = "/login",
  SIGNUP = "/signup",
  HOME = "/",
  PROJECT = `/projects/${PROJECT_PLACEHOLDER}`,
  PROJECT_DEPLOYMENTS = `/projects/${PROJECT_PLACEHOLDER}/deployments`,
  DEPLOYMENT = `/projects/${PROJECT_PLACEHOLDER}/deployments/${DEPLOYMENT_PLACEHOLDER}`,
}

export const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP];

export const PUBLIC_ROUTES = [...AUTH_ROUTES];

export const PROJECT_ROUTES = [ROUTES.PROJECT, ROUTES.PROJECT_DEPLOYMENTS];

export const DEPLOYMENTS_ROUTES = [ROUTES.DEPLOYMENT];

/**
 * @description Returns the project name from a given project pathname
 * @example getProjectFromPath("/projects/{projectRandom}/deployments") Output: "{projectRandom}"
 * @param pathname
 * @returns Project name
 */
export function getProjectFromPath(pathname: string): string {
  if (!pathname.includes("/projects")) return "";

  return pathname.split("/")[2];
}

/**
 * @description Returns the deployment id from a given deployment pathname
 * @example getProjectFromPath("/projects/{projectRandom}/deployments/{deploymentId}") Output: "{deploymentId}"
 * @param pathname
 * @returns Deployment id
 */
export function getDeploymentFromPath(pathname: string): string {
  if (!pathname.includes("/deployments")) return "";

  return pathname.split("/")[4];
}
