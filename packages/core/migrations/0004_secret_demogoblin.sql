CREATE TABLE IF NOT EXISTS "deployments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"project_id" uuid,
	"status" varchar,
	"environment" varchar,
	"duration_in_seconds" integer,
	"source_git_branch" varchar,
	"source_git_commit_sha" varchar,
	"source_git_commit_message" varchar,
	"source_git_commit_link" varchar,
	"build_logs" text,
	"screenshoot_url" varchar
);
