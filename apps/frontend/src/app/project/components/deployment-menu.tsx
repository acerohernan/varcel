import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

import { Button } from "@/components/ui/button";

export const DeploymentMenu = () => {
  return (
    <>
      <Button size="icon" variant="outline">
        <PiDotsThreeOutlineVerticalFill />
      </Button>
      <Button className="w-[150px]">Visit</Button>
    </>
  );
};
