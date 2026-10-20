import { TestSignIn1 } from "../test-sign-in-1";
import { TestSignIn2 } from "../test-sign-in-2";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";

export default function Welcome() {
  const handleDiscordSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "discord",
      callbackURL: "http://localhost:8080/api/auth/callback/discord"
    });
  };

  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-y-4">
      <h3 className="text-xl font-semibold">Welcome to BenStack Chat</h3>
      <div className="flex flex-col items-center justify-center gap-y-4">
        <Button onClick={handleDiscordSignIn}>Sign in with Discord</Button>
        <TestSignIn1 />
        <TestSignIn2 />
      </div>
    </div>
  );
}