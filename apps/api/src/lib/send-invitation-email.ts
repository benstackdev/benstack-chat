import type { RoleType } from "./auth.ts";
import { resend } from "./resend.ts";

export const sendInvitationEmail = async (role: RoleType, email: string, url: string, token: string) => {
  const { data, error } = await resend.emails.send({
    from: 'BenStack Chat <chat@benstack.dev>',
    to: email,
    subject: "You've been invited to join BenStack Chat!",
    html: `Activation URL: ${url}`
  });

  if (error) {
    return console.error({ error });
  }

  console.log(JSON.stringify(data));
};