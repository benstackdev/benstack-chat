CREATE TABLE "invite" (
	"id" text PRIMARY KEY,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp NOT NULL,
	"expires_at" timestamp NOT NULL,
	"max_uses" integer NOT NULL,
	"infinity_max_uses" boolean DEFAULT false NOT NULL,
	"created_by_user_id" text NOT NULL,
	"redirect_to_after_upgrade" text,
	"share_inviter_name" boolean NOT NULL,
	"email" text,
	"emails" text[],
	"role" text NOT NULL,
	"new_account" boolean,
	"status" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invite_use" (
	"id" text PRIMARY KEY,
	"invite_id" text NOT NULL,
	"used_at" timestamp NOT NULL,
	"used_by_user_id" text
);
--> statement-breakpoint
ALTER TABLE "invite" ADD CONSTRAINT "invite_created_by_user_id_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "invite_use" ADD CONSTRAINT "invite_use_invite_id_invite_id_fkey" FOREIGN KEY ("invite_id") REFERENCES "invite"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "invite_use" ADD CONSTRAINT "invite_use_used_by_user_id_user_id_fkey" FOREIGN KEY ("used_by_user_id") REFERENCES "user"("id") ON DELETE SET NULL;