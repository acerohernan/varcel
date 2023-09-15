ALTER TABLE "deployments_count" RENAME COLUMN "user_id" TO "project_id";--> statement-breakpoint
ALTER TABLE "last_deployments" RENAME COLUMN "user_id" TO "project_id";--> statement-breakpoint
ALTER TABLE "deployments_count" DROP CONSTRAINT "deployments_count_user_id_unique";--> statement-breakpoint
ALTER TABLE "last_deployments" DROP CONSTRAINT "last_deployments_user_id_unique";--> statement-breakpoint
ALTER TABLE "last_deployments" ADD COLUMN "deployment_id" uuid;--> statement-breakpoint
ALTER TABLE "deployments_count" ADD CONSTRAINT "deployments_count_project_id_unique" UNIQUE("project_id");--> statement-breakpoint
ALTER TABLE "last_deployments" ADD CONSTRAINT "last_deployments_project_id_unique" UNIQUE("project_id");