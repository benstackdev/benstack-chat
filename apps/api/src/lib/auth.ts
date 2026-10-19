import { db } from "../db/client.ts";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import dotenv from "dotenv";
import path from "path";
import { cwd } from "process";
import { admin } from "better-auth/plugins";
import { invite } from "better-invite";
import { sendInvitationEmail } from "./send-invitation-email.ts";
import * as authSchema from "@db/schemas/auth-schema.ts";

dotenv.config({ path: path.resolve(cwd(), ".env") });

// TODO: Make global type in shared package
export type RoleType = "guest" | "user" | "admin";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema
  }),
  trustedOrigins: [
    "http://localhost:5173",
    "http://localhost:8080"
  ],
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string
    }
  },
  plugins: [
    admin({
      defaultRole: "guest" as RoleType
    }),
    invite({
      defaultMaxUses: 1,
      defaultRedirectAfterUpgrade: "/auth/invited?token={token}",
      defaultCustomInviteUrl: "/activate-invite",
      async sendUserInvitation({ email, role, url, token, newAccount }) {
        if (newAccount)
          void sendInvitationEmail(role as RoleType, email, url, token);
      }
    })
  ]
});