import { testUserSignIn } from "@/lib/test-user-sign-in";
import { Button } from "./ui/button";

export function TestSignIn1() {
  return (
    <Button variant="outline" onClick={async () => await testUserSignIn(1)}>
      Sign in Test User 1
    </Button>
  );
}