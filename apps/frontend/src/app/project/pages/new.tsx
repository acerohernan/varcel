import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AiFillGithub, AiOutlineMenuUnfold } from "react-icons/ai";
import { RiCloseCircleLine } from "react-icons/ri";
import { BsPlusLg } from "react-icons/bs";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const NewProjectPage = () => {
  const [value, setValue] = useState("");

  return (
    <div className="dark:bg-black">
      <div className="p-8 max-w-[1200px] mx-auto">
        <h1 className="text-[2.5rem] leading-[2.8rem]">Let's build something new.</h1>
        <p className="text-muted-foreground mt-2">
          To deploy a new Project, import an existing Git Repository or get started with one of our Templates.
        </p>
        <Card className="w-full max-w-[800px] mx-auto bg-background mt-8">
          <CardHeader>
            <CardTitle className="text-center font-medium">Import Git Repository</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
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
            <div className="flex">
              <Input
                type="text"
                placeholder="Search..."
                className="px-10"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                leftIcon={
                  <div className="text-muted-foreground text-lg">
                    <BiSearch />
                  </div>
                }
                rightIcon={
                  value !== "" ? (
                    <button className="text-muted-foreground text-lg hover:text-white" onClick={() => setValue("")}>
                      <RiCloseCircleLine />
                    </button>
                  ) : null
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
