import { createAuthClient } from "better-auth/client";
import { adminClient } from "better-auth/client/plugins";
import { inviteClient } from "better-invite";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8080",
  plugins: [
    adminClient(),
    inviteClient()
  ]
});