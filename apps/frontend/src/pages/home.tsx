import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/auth";
import { useUser } from "@/hooks/query/useUser";
import { useEffect } from "react";

export const HomePage = () => {
  const { data: user, isLoading, isError } = useUser();
  const {
    actions: { logout },
  } = useAuthContext();
  const { toast } = useToast();

  useEffect(() => {
    if (isLoading) return;

    // If there's an error retrieving the user, notify and remove their credentials
    if (isError || !user) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Your credentials are expired or invalid! Please log in again.",
        variant: "destructive",
      });

      logout();
    }
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>HomePage</h1>
      <p>{JSON.stringify(user ?? {}, null, 1)}</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
