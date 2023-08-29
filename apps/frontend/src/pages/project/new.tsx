import { AiFillGithub } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";

export const NewProjectPage = () => {
  const [value, setValue] = useState("");

  return (
    <div className="p-4 max-w-[1200px] mx-auto">
      <h1 className="text-[2.8rem] leading-[2.8rem]">Let's build something new.</h1>
      <p className="text-muted-foreground mt-2">
        To deploy a new Project, import an existing Git Repository or get started with one of our Templates.
      </p>
      <div className="mt-10">
        <Card className="w-full bg-background">
          <CardHeader>
            <CardTitle className="text-center font-medium">Import Git Repository</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between border px-3 py-2 rounded-md h-10">
              <div className="flex items-center gap-2">
                <div className="text-lg">
                  <AiFillGithub />
                </div>
                <span className="font-light">acerohernan</span>
              </div>
              <div>
                <FiChevronDown />
              </div>
            </div>
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
