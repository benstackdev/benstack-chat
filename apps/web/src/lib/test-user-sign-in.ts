import { authClient } from "./auth-client";

export const testUserSignIn = async (user: 1 | 2) => {
  const { data, error } = await authClient.signIn.email({
    email: `test${user}@benstack.dev`,
    password: `password${user}`,
    callbackURL: "http://localhost:5173"
  });

  if (error) {
    console.error(error);
    return;
  }

  return data;
};