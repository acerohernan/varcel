import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCode } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useRepositories } from "@/hooks/query/useGitRepositories";
import { useGhIntegrationStatus } from "@/hooks/query/useGhIntegrationStatus";

import { AccountSelector } from "./account-selector";
import { ImportRepositoryCardSkeleton } from "./skeleton";

export const ImportRepositoryCard = () => {
  const { data: repositories, isLoading, isError } = useRepositories();
  const { data: ghIntegrationStatus, isLoading: statusLoading, isError: statusError } = useGhIntegrationStatus();

  const [value, setValue] = useState("");

  if (isLoading || statusLoading) return <ImportRepositoryCardSkeleton />;

  if (isError || statusError) return <h1>Error hapenning!</h1>;

  const ghIsInstalled = ghIntegrationStatus.isInstalled;

  const renderContent = () => {
    if (!ghIsInstalled)
      return (
        <div className="h-[400px] w-full flex flex-col items-center justify-center p-8 gap-4">
          <h4>You need to install the Github App to create a new project!</h4>
          <Button variant="default">
            <a href="https://github.com/apps/latinstation/installations/new">Install github app</a>
          </Button>
        </div>
      );

    if (!ghIsInstalled && repositories.length === 0)
      return (
        <div className="h-[400px] w-full flex flex-col items-center justify-center p-8 gap-4">
          <h4>You account has an active github integration but it don't have access to any repository!</h4>
          <Button variant="default">
            <a href="https://github.com/apps/latinstation/installations/new">Configure github app</a>
          </Button>
        </div>
      );

    return repositories.map((repo, index) => (
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
    ));
  };

  return (
    <Card className="w-full max-w-[800px] mx-auto bg-background">
      <CardHeader>
        <CardTitle className="text-center font-medium">Import Git Repository</CardTitle>
      </CardHeader>
      <CardContent>
        {ghIsInstalled ? (
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
                    <button
                      className="text-muted-foreground text-lg hover:text-foreground"
                      onClick={() => setValue("")}
                    >
                      <RiCloseCircleLine />
                    </button>
                  ) : null
                }
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 ">
            <Skeleton className="h-[40px]" />
            <Skeleton className="h-[40px]" />
          </div>
        )}

        <Card className="dark:bg-black mt-4">{renderContent()}</Card>
      </CardContent>
    </Card>
  );
};
