import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

export function SignOutButton() {
  const handleSignOut = async () => await authClient.signOut();

  return (
    <Button onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}