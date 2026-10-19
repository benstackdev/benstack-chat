import { Guest } from "@/components/pages/guest";
import Welcome from "@/components/pages/welcome";
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
            <Guest name={session.user.name} />
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