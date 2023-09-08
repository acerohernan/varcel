import { BsPlusLg } from "react-icons/bs";
import { AiFillGithub, AiOutlineMenuUnfold } from "react-icons/ai";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/hooks/query/useUser";

export const AccountSelector = () => {
  const { data: user } = useUser();

  if (!user) return null;

  return (
    <Select defaultValue="acerohernan">
      <SelectTrigger className="w-full">
        <SelectValue>
          <div className="flex items-center gap-2">
            <div className="text-lg">
              <AiFillGithub />
            </div>
            <span className="">{user.username}</span>
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
              <span className="">{user.username}</span>
            </div>
          </SelectItem>
        </SelectGroup>
        <a
          className="gap-2 relative flex w-full select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent cursor-pointer"
          href="https://github.com/apps/latinstation/installations/new"
          target="_blank"
          rel="noreferrer"
        >
          <BsPlusLg />
          <span className="">Add Github Account</span>
        </a>
        <button
          className="gap-2 relative flex w-full select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent cursor-pointer"
          data-disabled
        >
          <AiOutlineMenuUnfold />
          <span className="">Switch Git Provider</span>
        </button>
      </SelectContent>
    </Select>
  );
};
