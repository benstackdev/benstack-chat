import { testUserSignIn } from "@/lib/test-user-sign-in";
import { Button } from "./ui/button";

export function TestSignIn2() {
  return (
    <Button variant="outline" onClick={async () => await testUserSignIn(2)}>
      Sign in Test User 2
    </Button>
  );
}