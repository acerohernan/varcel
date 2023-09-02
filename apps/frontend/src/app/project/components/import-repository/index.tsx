import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountSelector } from "./account-selector";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const ImportRepositoryCard = () => {
  const [value, setValue] = useState("");

  return (
    <Card className="w-full max-w-[800px] mx-auto bg-background">
      <CardHeader>
        <CardTitle className="text-center font-medium">Import Git Repository</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <AccountSelector />
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
                  <button className="text-muted-foreground text-lg hover:text-foreground" onClick={() => setValue("")}>
                    <RiCloseCircleLine />
                  </button>
                ) : null
              }
            />
          </div>
        </div>
        <Card className="dark:bg-black mt-4">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                className={cn("p-4 flex items-center justify-between", index !== 4 && "border-b")}
                key={Math.random()}
              >
                <div className="flex items-center gap-4">
                  <div className="text-xl text-muted-foreground">
                    <AiOutlineQuestionCircle />
                  </div>
                  <span className="font-light text-sm">ts-vercel-clone</span>
                </div>
                <Button asChild>
                  <Link to="/new/import">Import</Link>
                </Button>
              </div>
            ))}
        </Card>
      </CardContent>
    </Card>
  );
};
