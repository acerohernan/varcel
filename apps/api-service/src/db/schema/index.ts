import { tiers } from "./tier";

import { users } from "./user";
import { userGhIntegrations } from "./user/gh-integration";

import { projects } from "./project";
import { projectBuildSettings } from "./project/build-settings";
import { projectEnvVariables } from "./project/env-variables";
import { projectRepositories } from "./project/repository";
import { deployments } from "./deployment";

export const schema = {
  tiers,

  users,
  userGhIntegrations,

  projects,
  projectBuildSettings,
  projectEnvVariables,
  projectRepositories,

  deployments,
};
