import { Chat } from "@/components/pages/chat";
import { Guest } from "@/components/pages/guest";
import Welcome from "@/components/pages/welcome";
import { SignOutButton } from "@/components/sign-out-button";
import { authClient } from "@/lib/auth-client";

export function Home() {
  const {
    data: session,
    isPending,
    error,
    refetch
  } = authClient.useSession();

  // TODO: make proper loading page
  if (isPending)
    return <>Loading...</>;

  if (!error) {
    return (
      <>
        {
          session ?
            session.user.role === "guest" ?
              <Guest name={session.user.name} />
              :
              (
                <div className="flex flex-col items-center gap-y-8">
                  <Chat />
                  <SignOutButton />
                </div>
              )
            :
            <Welcome />
        }
      </>
    );
  }

  return (
    <>
      {JSON.stringify(error, null, 2)}
    </>
  );
}