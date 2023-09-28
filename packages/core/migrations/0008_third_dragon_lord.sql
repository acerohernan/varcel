ALTER TABLE "project_repositories" ADD COLUMN "owner" varchar NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_and_owner_idx" ON "project_repositories" ("name","owner");