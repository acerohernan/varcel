import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const AddResourceMenu = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="text-lg flex-shrink-0">
          <AiOutlinePlus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-black">
        <DropdownMenuItem className="px-3" onClick={() => navigate("/new")}>
          Project
        </DropdownMenuItem>
        <DropdownMenuItem className="px-3">Domain</DropdownMenuItem>
        <DropdownMenuItem className="px-3">Storage</DropdownMenuItem>
        <DropdownMenuItem className="px-3">Team</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
