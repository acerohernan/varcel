import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BiBell } from "react-icons/bi";
import { Button } from "../ui/button";
import { MdDone } from "react-icons/md";

export const Notifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="text-lg rounded-full">
          <BiBell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-[70px] bg-white dark:bg-black">
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
  );
};
