import * as z from "zod";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)\S{8,64}$/;

export const signUpValidation = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().regex(passwordRegex, { error: "Password must contain at least one letter, one digit, and be between 8-64 characters" }),
  passwordConfirm: z.string().regex(passwordRegex, { error: "Password must contain at least one letter, one digit, and be between 8-64 characters" })
}).refine(
  ({ password, passwordConfirm }) => password === passwordConfirm,
  {
    error: "Password does not match",
    path: ["passwordConfirm"]
  });

export const adminSignInValidation = z.object({
  email: z.email(),
  password: z.string().regex(passwordRegex, { error: "Invalid passowrd format" })
});