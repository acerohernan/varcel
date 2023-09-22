import { eq } from "drizzle-orm";

import {
  Project,
  ProjectBuildSettings,
  projectBuildSettings,
  projects,
} from "@vercelclone/core/src/db";

import { db } from "@/db";
import { IProjectRepository } from "@/interfaces/repositories";
export class ProjectRepository implements IProjectRepository {
  async getById(projectId: string): Promise<Project | undefined> {
    return db.query.projects.findFirst({
      where: eq(projects.id, projectId),
    });
  }

  async getBuildSettings(
    projectId: string
  ): Promise<ProjectBuildSettings | undefined> {
    return db.query.projectBuildSettings.findFirst({
      where: eq(projectBuildSettings.projectId, projectId),
    });
  }
}
