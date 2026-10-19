import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function AdminPage() {
  const navigate = useNavigate();

  const {
    data: session,
    isPending,
    error,
    refetch
  } = authClient.useSession();

  // TODO: replace with loading component
  if (isPending)
    return <>Loading...</>;

  useEffect(() => {
    if (!isPending && session?.user.role !== "admin") {
      navigate("/");
    }
  }, []);

  if (!error) {
    return (
      <>
        {
          session ?
            (<>Admin Page</>)
            : null
        }
      </>);
  }

  return (
    <>
      {JSON.stringify(error, null, 2)}
    </>
  );
}