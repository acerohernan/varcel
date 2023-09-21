ALTER TABLE "project_env_variables" RENAME COLUMN "name" TO "key";--> statement-breakpoint
ALTER TABLE "project_env_variables" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project_env_variables" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tiers" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tiers" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users_gh_integrations" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users_gh_integrations" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project_build_settings" ADD COLUMN "root_directory" varchar;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "framework" varchar;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_framework_unique" UNIQUE("framework");