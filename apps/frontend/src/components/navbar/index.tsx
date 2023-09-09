import { ThemeSelector } from "./theme-selector";
import { Notifications } from "./notifications";
import { MainMenu } from "./main-menu";

import { TeamSwitcher } from "./team-selector";
import { useUser } from "@/hooks/query/useUser";
import { useAuthContext } from "@/app/auth/context";
import { useToast } from "../ui/use-toast";
import { useEffect } from "react";

export const Navbar = () => {
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

  return (
    <div className="bg-white dark:bg-black flex items-center justify-between px-6 py-4">
      <TeamSwitcher />

      <div className="flex items-center gap-1">
        <ThemeSelector />
        <Notifications />
        <MainMenu />
      </div>
    </div>
  );
};
``;
