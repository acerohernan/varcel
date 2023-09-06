import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export const DeploymentMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <PiDotsThreeOutlineVerticalFill />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-background">
        <DropdownMenuItem className="px-3">Promote to Production</DropdownMenuItem>
        <DropdownMenuItem className="px-3">Redeploy</DropdownMenuItem>
        <DropdownMenuItem className="px-3">Copy URL</DropdownMenuItem>
        <DropdownMenuItem className="px-3">View All Branch Deployments</DropdownMenuItem>
        <DropdownMenuItem className="px-3 text-red-500 focus:text-red-500">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
