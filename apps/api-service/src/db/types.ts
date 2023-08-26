import { InferModel } from "drizzle-orm";

import { users } from "./schema/user";
import { userGhIntegrations } from "./schema/user/gh-integration";
import { projects } from "./schema/project";
import { projectRepositories } from "./schema/project/repository";
import { projectBuildSettings } from "./schema/project/build-settings";
import { projectEnvVariables } from "./schema/project/env-variables";
import { tiers } from "./schema/tier";
import { deployments } from "./schema/deployment";

export type Tier = InferModel<typeof tiers, "select">;
export type NewTier = InferModel<typeof tiers, "insert">;

export type User = InferModel<typeof users, "select">;
export type NewUser = InferModel<typeof users, "insert">;

export type UserGhIntegration = InferModel<typeof userGhIntegrations, "select">;
export type NewUserGhIntegration = InferModel<
  typeof userGhIntegrations,
  "insert"
>;

export type Project = InferModel<typeof projects, "select">;
export type NewProject = InferModel<typeof projects, "insert">;

export type ProjectRepository = InferModel<
  typeof projectRepositories,
  "select"
>;
export type NewProjectRepository = InferModel<
  typeof projectRepositories,
  "insert"
>;

export type ProjectBuildSettings = InferModel<
  typeof projectBuildSettings,
  "select"
>;
export type NewProjectBuildSettings = InferModel<
  typeof projectBuildSettings,
  "insert"
>;

export type ProjectEnvVariable = InferModel<
  typeof projectEnvVariables,
  "select"
>;
export type NewProjectEnvVariable = InferModel<
  typeof projectEnvVariables,
  "insert"
>;

export type Deployment = InferModel<typeof deployments, "select">;
export type NewDeployment = InferModel<typeof deployments, "insert">;
