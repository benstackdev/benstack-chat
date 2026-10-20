import { defineRelations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema.ts";

export const user_member = pgTable("user_member", {
  id: text("id").primaryKey().references(() => user.id, { onDelete: "cascade" }),
  username: text("username").notNull(),
  bio: text("bio"),
  lastActive: timestamp("last_active").notNull().defaultNow()
});

export const conversation = pgTable("conversation", {
  id: text("id").primaryKey(),
  name: text("name")
});

export const message = pgTable("message", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id").notNull().references(() => conversation.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  timeSent: timestamp("time_sent").notNull().defaultNow()
});

export const conversation_member = pgTable("conversation_member", {
  userMemberId: text("user_member_id").notNull().references(() => user_member.id),
  conversationId: text("conversation_id").notNull().references(() => conversation.id),
  lastReadMessageId: text("last_read_message_id").references(() => message.id, { onDelete: "cascade" })
}, (table) => [primaryKey({ columns: [table.userMemberId, table.conversationId] })]);

export const relations = defineRelations({ user, user_member, conversation, conversation_member },
  (r) => ({
    user_member: {
      user_conversations: r.many.conversation({
        from: r.user_member.id.through(r.conversation_member.userMemberId),
        to: r.conversation.id.through(r.conversation_member.conversationId)
      })
    },
    conversation: {
      participants: r.many.user_member()
    }
  }));