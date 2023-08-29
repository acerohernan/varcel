import { BiBell, BiMoon } from "react-icons/bi";
import { FiSun } from "react-icons/fi";
import { HiMenuAlt4 } from "react-icons/hi";
import { MdDone } from "react-icons/md";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/theme/provider";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-black flex items-center justify-between border px-6 py-2">
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src="https://vercel.com/api/www/avatar?u=acerohernan&s=44" />
          <AvatarFallback>HA</AvatarFallback>
        </Avatar>
        <span className="font-light text-sm">acerohernan</span>
      </div>
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="text-lg rounded-full">
              {theme === "light" ? <FiSun /> : <BiMoon />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white dark:bg-black">
            <DropdownMenuItem className="p-2" onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2" onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2" onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="text-lg rounded-full">
              <BiBell />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-6 bg-white dark:bg-black">
            <div>
              <div className="flex items-center gap-4 px-4 py-2 border-b dark:border-slate-800">
                <div className="text-green-500 p-1 rounded-full border border-green-500">
                  <MdDone />
                </div>
                <div>
                  <span className="text-sm">Account successfully created!</span>
                  <p className="text-sm font-light text-slate-400">1d ago</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 px-4 py-2">
                <div className="text-green-500 p-1 rounded-full border border-green-500">
                  <MdDone />
                </div>
                <div>
                  <span className="text-sm">Account successfully created!</span>
                  <p className="text-sm font-light text-slate-400">1d ago</p>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="text-lg rounded-full">
              <HiMenuAlt4 />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-6 bg-white dark:bg-black">
            <DropdownMenuLabel>
              <span className="block dark:text-slate-300 font-light p-2 w-[300px]">
                contacto.acero.hernan@gmail.com
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-4 py-2 font-light cursor-pointer">Dashboard</DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 font-light cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 font-light cursor-pointer">New Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-4 py-2 font-light cursor-pointer">Command Menu</DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 font-light cursor-pointer">Theme</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-4 py-2 font-light cursor-pointer">Latin Station Homepage</DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 font-light cursor-pointer">Logout</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button className="w-full">Upgrade to Pro</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
``;
