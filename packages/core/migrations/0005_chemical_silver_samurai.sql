CREATE TABLE IF NOT EXISTS "deployments_count" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"total_count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "deployments_count_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "last_deployments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "last_deployments_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_count" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"total_count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "projects_count_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "projects" DROP CONSTRAINT "projects_framework_unique";--> statement-breakpoint
ALTER TABLE "deployments" ALTER COLUMN "project_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "deployments" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "deployments" ALTER COLUMN "environment" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "deployments" ALTER COLUMN "duration_in_seconds" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "deployments" ALTER COLUMN "source_git_branch" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "deployments" ALTER COLUMN "source_git_commit_sha" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "deployments" ALTER COLUMN "source_git_commit_message" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "deployments" ALTER COLUMN "source_git_commit_link" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "deployments" ALTER COLUMN "build_logs" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "deployments" ALTER COLUMN "screenshoot_url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project_build_settings" ALTER COLUMN "project_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project_build_settings" ALTER COLUMN "build_command" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project_build_settings" ALTER COLUMN "output_dir" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project_build_settings" ALTER COLUMN "install_command" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project_build_settings" ALTER COLUMN "root_directory" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project_env_variables" ALTER COLUMN "project_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project_env_variables" ALTER COLUMN "key" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project_env_variables" ALTER COLUMN "value" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "subdomain" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "framework" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project_repositories" ALTER COLUMN "project_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project_repositories" ALTER COLUMN "url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project_repositories" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project_repositories" ALTER COLUMN "namespace" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project_repositories" ALTER COLUMN "branch" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tiers" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tiers" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tiers" ALTER COLUMN "concurrent_builds" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tiers" ALTER COLUMN "max_number_of_projects" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users_gh_integrations" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users_gh_integrations" ALTER COLUMN "gh_user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "tier_id" SET NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "projects" ("name");--> statement-breakpoint
ALTER TABLE "project_build_settings" ADD CONSTRAINT "project_build_settings_project_id_unique" UNIQUE("project_id");--> statement-breakpoint
ALTER TABLE "project_repositories" ADD CONSTRAINT "project_repositories_project_id_unique" UNIQUE("project_id");--> statement-breakpoint
ALTER TABLE "users_gh_integrations" ADD CONSTRAINT "users_gh_integrations_user_id_unique" UNIQUE("user_id");