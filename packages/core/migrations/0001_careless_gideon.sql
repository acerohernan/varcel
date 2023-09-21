CREATE TABLE IF NOT EXISTS "users_gh_integrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"gh_user_id" integer,
	"gh_installation_id" integer,
	CONSTRAINT "users_gh_integrations_gh_user_id_unique" UNIQUE("gh_user_id"),
	CONSTRAINT "users_gh_integrations_gh_installation_id_unique" UNIQUE("gh_installation_id")
);
