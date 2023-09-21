import { InferSelectModel, InferInsertModel } from "drizzle-orm";

import { users } from "./schema/user";
import { userGhIntegrations } from "./schema/user/gh-integration";
import { projects } from "./schema/project";
import { projectRepositories } from "./schema/project/repository";
import { projectBuildSettings } from "./schema/project/build-settings";
import { projectEnvVariables } from "./schema/project/env-variables";
import { tiers } from "./schema/tier";
import { deployments } from "./schema/deployment";

export type Tier = InferSelectModel<typeof tiers>;
export type NewTier = InferInsertModel<typeof tiers>;

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type UserGhIntegration = InferSelectModel<typeof userGhIntegrations>;
export type NewUserGhIntegration = InferInsertModel<typeof userGhIntegrations>;

export type Project = InferSelectModel<typeof projects>;
export type NewProject = InferInsertModel<typeof projects>;

export type ProjectRepository = InferSelectModel<typeof projectRepositories>;
export type NewProjectRepository = InferInsertModel<typeof projectRepositories>;

export type ProjectBuildSettings = InferSelectModel<
  typeof projectBuildSettings
>;
export type NewProjectBuildSettings = InferInsertModel<
  typeof projectBuildSettings
>;

export type ProjectEnvVariable = InferSelectModel<typeof projectEnvVariables>;
export type NewProjectEnvVariable = InferInsertModel<
  typeof projectEnvVariables
>;

export type Deployment = InferSelectModel<typeof deployments>;
export type NewDeployment = InferInsertModel<typeof deployments>;
