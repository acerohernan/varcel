import { v4 } from "uuid";
import { injectable } from "inversify";
import { and, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import {
  projects,
  deployments,
  projectsCount,
  deploymentsCount,
  projectRepositories,
  projectEnvVariables,
  lastDeployments,
  projectBuildSettings,
} from "@vercelclone/core/src/db";

import {
  NewProjectRepository,
  NewProject,
  NewProjectBuildSettings,
  NewProjectEnvVariable,
  Project,
  ProjectRepository as DBProjectRepository,
  ProjectBuildSettings,
  NewDeployment,
} from "@vercelclone/core/src/db/";

interface ICreateParams {
  project: NewProject;
  repository: NewProjectRepository;
  buildSettings: NewProjectBuildSettings;
  envVariables: Array<NewProjectEnvVariable>;
  deployment: NewDeployment;
}

interface IGetByUserIdAndName {
  userId: string;
  projectName: string;
  withEntity?: { lastDeployment: boolean };
}
export interface IProjectRepository {
  create: (params: ICreateParams) => Promise<void>;
  getById: (projectId: string) => Promise<Project | undefined>;
  getByUserIdAndName: (
    params: IGetByUserIdAndName
  ) => Promise<Project | undefined>;
  getBySubdomain: (subdomain: string) => Promise<Project | undefined>;
  getRepository: (
    projectId: string
  ) => Promise<DBProjectRepository | undefined>;
  getBuildSettings: (
    projectId: string
  ) => Promise<ProjectBuildSettings | undefined>;
  getAll: (params: {
    userId: string;
    limit: number;
    offset: number;
  }) => Promise<Project[]>;
  getTotalCount: (params: { userId: string }) => Promise<number>;
}

@injectable()
export class ProjectRepository implements IProjectRepository {
  async getAll({
    userId,
    limit,
    offset,
  }: {
    userId: string;
    limit: number;
    offset: number;
  }) {
    const result = await db
      .select()
      .from(projects)
      .innerJoin(lastDeployments, eq(projects.id, lastDeployments.projectId))
      .innerJoin(deployments, eq(deployments.id, lastDeployments.deploymentId))
      .where(eq(projects.userId, userId))
      .limit(limit)
      .offset(offset);

    const projectsRes = result.map((r) => ({
      ...r.projects,
      latestDeployment: r.deployments,
    }));

    return projectsRes;
  }

  async getTotalCount({ userId }: { userId: string }): Promise<number> {
    const result = await db.query.projectsCount.findFirst({
      where: eq(projectsCount.userId, userId),
    });

    if (!result) return 0;

    return result.totalCount;
  }

  async create({
    project,
    repository,
    buildSettings,
    envVariables,
    deployment,
  }: ICreateParams) {
    await db.transaction(async (tx) => {
      await tx.insert(projects).values(project);

      await Promise.all([
        tx.insert(projectRepositories).values(repository),
        tx.insert(projectBuildSettings).values(buildSettings),
        envVariables.map((variable) =>
          tx.insert(projectEnvVariables).values(variable)
        ),
        tx
          .update(projectsCount)
          .set({ totalCount: sql`${projectsCount.totalCount} + 1` })
          .where(eq(projectsCount.userId, project.userId)),
        tx.insert(deployments).values(deployment),
        tx
          .insert(deploymentsCount)
          .values({ id: v4(), projectId: project.id!, totalCount: 0 }),
        tx.insert(lastDeployments).values({
          id: v4(),
          projectId: project.id!,
          deploymentId: deployment.id,
        }),
      ]);
    });
  }

  async getById(projectId: string) {
    return db.query.projects.findFirst({
      where: eq(projects.id, projectId),
    });
  }

  async getBySubdomain(projectSubdomain: string) {
    return db.query.projects.findFirst({
      where: eq(projects.subdomain, projectSubdomain),
    });
  }

  async getByUserIdAndName({
    userId,
    projectName,
    withEntity,
  }: IGetByUserIdAndName) {
    if (withEntity) {
      const query = db.select().from(projects);

      if (withEntity.lastDeployment) {
        query
          .innerJoin(
            lastDeployments,
            eq(projects.id, lastDeployments.projectId)
          )
          .innerJoin(
            deployments,
            eq(deployments.id, lastDeployments.deploymentId)
          );
      }

      const result = await query
        .where(and(eq(projects.userId, userId), eq(projects.name, projectName)))
        .limit(1)
        .execute();

      const projectRes = result[0] as any;

      if (!projectRes) return undefined;

      return {
        ...projectRes.projects,
        latestDeployment: withEntity.lastDeployment
          ? projectRes.deployments
          : undefined,
      };
    }

    const project = await db.query.projects.findFirst({
      where: and(eq(projects.userId, userId), eq(projects.name, projectName)),
    });

    return project;
  }

  async getRepository(projectId: string) {
    return db.query.projectRepositories.findFirst({
      where: eq(projectRepositories.projectId, projectId),
    });
  }

  async getBuildSettings(projectId: string) {
    return db.query.projectBuildSettings.findFirst({
      where: eq(projectBuildSettings.projectId, projectId),
    });
  }
}
