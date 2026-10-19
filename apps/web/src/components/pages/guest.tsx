import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";

type GuestProps = {
  name: string;
};

export function Guest({ name }: GuestProps) {
  const handleSignOut = async () => await authClient.signOut();

  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-y-4">
      <h3 className="text-xl font-semibold">Welcome {name}!</h3>
      <p className="text-muted-foreground">
        Waiting for BenStack to approve your request to join BenStack Chat...
      </p>
      <Button onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}