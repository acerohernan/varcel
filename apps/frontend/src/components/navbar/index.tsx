import { Link } from "react-router-dom";

import { ThemeSelector } from "./theme-selector";
import { Notifications } from "./notifications";
import { MainMenu } from "./main-menu";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TeamSwitcher } from "./team-selector";

export const Navbar = () => {
  return (
    <div className="bg-white dark:bg-black flex items-center justify-between px-6 py-2">
      <div className="flex items-center gap-2">
        <TeamSwitcher />
      </div>
      <div className="flex items-center gap-1">
        <ThemeSelector />
        <Notifications />
        <MainMenu />
      </div>
    </div>
  );
};
``;
