import { Link } from "react-router-dom";

import { ThemeSelector } from "./theme-selector";
import { Notifications } from "./notifications";
import { MainMenu } from "./main-menu";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Navbar = () => {
  return (
    <div className="bg-white dark:bg-black flex items-center justify-between px-6 py-2">
      <div className="flex items-center gap-2">
        <Link to="/">
          <Avatar className="h-6 w-6">
            <AvatarImage src="https://vercel.com/api/www/avatar?u=acerohernan&s=44" />
            <AvatarFallback>HA</AvatarFallback>
          </Avatar>
        </Link>
        <span className="font-light text-sm">acerohernan</span>
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
