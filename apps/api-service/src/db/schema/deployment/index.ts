import { primaryKeys, timestamps } from "@/db/utils";
import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  uuid,
  varchar,
  text,
  pgEnum,
} from "drizzle-orm/pg-core";
import { projects } from "../project";

export const deployments = pgTable("deployments", {
  ...primaryKeys,
  ...timestamps,
  projectId: uuid("project_id"),
  status: varchar("status", {
    enum: ["ready", "error", "building", "queued", "canceled"],
  }),
  environment: varchar("environment", {
    enum: ["development", "staging", "production"],
  }),
  durationInSeconds: integer("duration_in_seconds"),
  sourceGitBranch: varchar("source_git_branch"),
  sourceGitCommit: varchar("source_git_commit"),
  buildLogs: text("build_logs"),
  screenshootUrl: varchar("screenshoot_url"),
});

export const deploymentsRelations = relations(deployments, ({ one }) => ({
  project: one(projects, {
    fields: [deployments.projectId],
    references: [projects.id],
  }),
}));
