import { db } from "../db/client.ts";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import dotenv from "dotenv";
import path from "path";
import { cwd } from "process";
import { admin } from "better-auth/plugins";
import { invite } from "better-invite";
import { sendInvitationEmail } from "./send-invitation-email.ts";

dotenv.config({ path: path.resolve(cwd(), ".env") });

export type RoleType = "user" | "admin";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg"
  }),
  emailAndPassword: {
    enabled: true
  },
  plugins: [
    admin({
      defaultRole: "user" as RoleType
    }),
    invite({
      defaultRedirectAfterUpgrade: "/auth/invited?token={token}",
      async sendUserInvitation({ email, role, url, token, newAccount }) {
        if (newAccount)
          void sendInvitationEmail(role as RoleType, email, url);
      }
    })
  ]
});