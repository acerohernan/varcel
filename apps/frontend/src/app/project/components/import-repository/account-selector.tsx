import { BsPlusLg } from "react-icons/bs";
import { AiFillGithub, AiOutlineMenuUnfold } from "react-icons/ai";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const AccountSelector = () => {
  return (
    <Select defaultValue="acerohernan">
      <SelectTrigger className="w-full">
        <SelectValue>
          <div className="flex items-center gap-2">
            <div className="text-lg">
              <AiFillGithub />
            </div>
            <span className="">acerohernan</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="acerohernan">
            <div className="flex items-center gap-2">
              <div className="text-lg">
                <AiFillGithub />
              </div>
              <span className="">acerohernan</span>
            </div>
          </SelectItem>
        </SelectGroup>
        <a className="gap-2 relative flex w-full select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent cursor-pointer">
          <BsPlusLg />
          <span className="">Add Github Account</span>
        </a>
        <a className="gap-2 relative flex w-full select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent cursor-pointer">
          <AiOutlineMenuUnfold />
          <span className="">Switch Git Provider</span>
        </a>
      </SelectContent>
    </Select>
  );
};
