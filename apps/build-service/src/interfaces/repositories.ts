import {
  Deployment,
  ProjectBuildSettings,
  User,
  UserGhIntegration,
} from "@vercelclone/core/src/db";

export interface IDeploymentRepository {
  getById: (id: string) => Promise<Deployment | undefined>;
  update: (id: string, body: Partial<Deployment>) => Promise<void>;
}

export interface IUserRepository {
  getById: (id: string) => Promise<User | undefined>;
  getGhIntegration: (id: string) => Promise<UserGhIntegration | undefined>;
}

export interface IProjectRepository {
  getById: (id: string) => Promise<User | undefined>;
  getBuildSettings: (id: string) => Promise<ProjectBuildSettings | undefined>;
}
