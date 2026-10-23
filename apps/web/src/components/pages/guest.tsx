import { SignOutButton } from "../sign-out-button";

type GuestProps = {
  name: string;
};

export function Guest({ name }: GuestProps) {
  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-y-4">
      <h3 className="text-xl font-semibold">Welcome {name}!</h3>
      <p className="text-muted-foreground">
        Waiting for BenStack to approve your request to join BenStack Chat...
      </p>
      <SignOutButton />
    </div>
  );
}