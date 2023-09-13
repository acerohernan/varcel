import { relations } from "drizzle-orm";
import { integer, pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";

import { primaryKeys, timestamps } from "@/db/utils";

import { projects } from "../project";

export const deployments = pgTable("deployments", {
  ...primaryKeys,
  ...timestamps,
  projectId: uuid("project_id").notNull(),
  status: varchar("status", {
    enum: ["ready", "error", "building", "queued", "canceled"],
  }).notNull(),
  environment: varchar("environment", {
    enum: ["development", "staging", "production"],
  }).notNull(),
  durationInSeconds: integer("duration_in_seconds").notNull(),
  sourceGitBranch: varchar("source_git_branch").notNull(),
  sourceGitCommitSha: varchar("source_git_commit_sha").notNull(),
  sourceGitCommitMessage: varchar("source_git_commit_message").notNull(),
  sourceGitCommitLink: varchar("source_git_commit_link").notNull(),
  buildLogs: text("build_logs").notNull(),
  screenshootUrl: varchar("screenshoot_url").notNull(),
});

export const deploymentsRelations = relations(deployments, ({ one }) => ({
  project: one(projects, {
    fields: [deployments.projectId],
    references: [projects.id],
  }),
}));
