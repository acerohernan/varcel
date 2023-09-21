import { tiers } from "./tier";

import { users } from "./user";
import { userGhIntegrations } from "./user/gh-integration";

import { projects } from "./project";
import { projectBuildSettings } from "./project/build-settings";
import { projectEnvVariables } from "./project/env-variables";
import { projectRepositories } from "./project/repository";
import { deployments } from "./deployment";
import { projectsCount } from "./project/count";
import { lastDeployments } from "./deployment/last-deployment";
import { deploymentsCount } from "./deployment/count";

export const schema = {
  tiers,

  users,
  userGhIntegrations,

  projects,
  projectBuildSettings,
  projectEnvVariables,
  projectRepositories,
  projectsCount,
  lastDeployments,

  deployments,
  deploymentsCount,
};

export * from "./deployment";
export * from "./project";
export * from "./user";
export * from "./tier";
