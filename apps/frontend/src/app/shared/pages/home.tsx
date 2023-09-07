import { BiSearch } from "react-icons/bi";
import { useCallback, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";

import { Input } from "@/components/ui/input";
import { ProjectCard } from "../components/project-card";
import { AddResourceMenu } from "../components/add-resource-menu";

import { useProjects } from "@/hooks/query/useProjects";

export const HomePage = () => {
  const { data: projects, isLoading, isError } = useProjects();

  const [value, setValue] = useState("");

  const renderContent = useCallback(() => {
    if (isLoading) return <div className="text-center mt-10">Loading...</div>;

    if (isError || !projects)
      return <div className="text-center mt-10">Something went wrong at retrieving projects!</div>;

    if (projects.length === 0)
      return <div className="text-center mt-10">You don't have created projects, please create one!</div>;

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(() => (
          <ProjectCard key={Math.random()} />
        ))}
      </div>
    );
  }, [isLoading, isError, projects]);

  return (
    <div className="border-t flex-1 flex flex-col">
      <div className="w-full max-w-[1200px] p-4 mx-auto flex-1 flex flex-col">
        <div className="mb-4 flex items-center gap-4">
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
          <AddResourceMenu />
        </div>
        {renderContent()}
      </div>
    </div>
  );
};
