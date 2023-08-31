import { HiMenuAlt4 } from "react-icons/hi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuthContext } from "@/app/auth/context";

import { Button } from "../ui/button";

export const MainMenu = () => {
  const {
    actions: { logout },
  } = useAuthContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="text-lg rounded-full">
          <HiMenuAlt4 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-6 bg-white dark:bg-black">
        <DropdownMenuLabel>
          <span className="block dark:text-slate-300 font-light p-2 w-[300px]">contacto.acero.hernan@gmail.com</span>
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
        <DropdownMenuItem className="px-4 py-2 font-light cursor-pointer" onClick={logout}>
          Logout
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button className="w-full">Upgrade to Pro</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
