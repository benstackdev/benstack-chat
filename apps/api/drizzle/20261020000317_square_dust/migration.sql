ALTER TABLE "user_member" DROP CONSTRAINT "user_member_username_user_name_fkey";--> statement-breakpoint
ALTER TABLE "user_member" ALTER COLUMN "username" DROP NOT NULL;