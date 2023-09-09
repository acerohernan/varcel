import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountSelector } from "./account-selector";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useRepositories } from "@/hooks/query/useGitRepositories";
import { ImportRepositoryCardSkeleton } from "./skeleton";
import { FaCode } from "react-icons/fa";

export const ImportRepositoryCard = () => {
  const { data: repositories, isLoading, isError } = useRepositories();
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  if (isLoading) return <ImportRepositoryCardSkeleton />;

  if (isError) return <h1>Error hapenning!</h1>;

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
          {repositories.length === 0 ? (
            <div className="h-[400px] w-full flex items-center justify-center p-8">
              <h4>Sorry, you don't have a configured repository! Please install our github app!</h4>
            </div>
          ) : null}

          {repositories.map((repo, index) => (
            <div
              className={cn("p-4 flex items-center justify-between", index !== repositories.length - 1 && "border-b")}
              key={Math.random()}
            >
              <div className="flex items-center gap-4">
                <div className="text-xl text-muted-foreground">
                  <FaCode />
                </div>
                <span className="font-light text-sm">{repo.name}</span>
              </div>
              <Button asChild>
                <Link to={`/new/import?url=${repo.url}`}>Import</Link>
              </Button>
            </div>
          ))}
        </Card>
      </CardContent>
    </Card>
  );
};
