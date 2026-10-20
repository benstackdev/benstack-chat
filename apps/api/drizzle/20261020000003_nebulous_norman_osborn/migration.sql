CREATE TABLE "conversation" (
	"id" text PRIMARY KEY,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "conversation_member" (
	"user_member_id" text,
	"conversation_id" text,
	"last_read_message_id" text,
	CONSTRAINT "conversation_member_pkey" PRIMARY KEY("user_member_id","conversation_id")
);
--> statement-breakpoint
CREATE TABLE "message" (
	"id" text PRIMARY KEY,
	"conversation_id" text NOT NULL,
	"content" text NOT NULL,
	"time_sent" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_member" (
	"id" text PRIMARY KEY,
	"username" text NOT NULL,
	"bio" text,
	"last_active" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "conversation_member" ADD CONSTRAINT "conversation_member_user_member_id_user_member_id_fkey" FOREIGN KEY ("user_member_id") REFERENCES "user_member"("id");--> statement-breakpoint
ALTER TABLE "conversation_member" ADD CONSTRAINT "conversation_member_conversation_id_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversation"("id");--> statement-breakpoint
ALTER TABLE "conversation_member" ADD CONSTRAINT "conversation_member_last_read_message_id_message_id_fkey" FOREIGN KEY ("last_read_message_id") REFERENCES "message"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_conversation_id_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversation"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_member" ADD CONSTRAINT "user_member_id_user_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_member" ADD CONSTRAINT "user_member_username_user_name_fkey" FOREIGN KEY ("username") REFERENCES "user"("name") ON DELETE CASCADE;