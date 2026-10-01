import { db } from "../db/client.ts";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import dotenv from "dotenv";
import path from "path";
import { cwd } from "process";

dotenv.config({ path: path.resolve(cwd(), ".env") });

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg"
  }),
  emailAndPassword: {
    enabled: true
  }
});