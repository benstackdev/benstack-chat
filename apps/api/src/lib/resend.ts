import { Resend } from "resend";
import dotenv from "dotenv";
import path from "path";
import { cwd } from "process";

dotenv.config({ path: path.resolve(cwd(), ".env") });

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTestEmail = () => {
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'ben@benstack.dev',
    subject: 'Hello World!',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
  });
};