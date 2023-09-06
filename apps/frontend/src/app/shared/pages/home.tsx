import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";

import { Input } from "@/components/ui/input";

import { ProjectCard } from "../components/project-card";
import { AddResourceMenu } from "../components/add-resource-menu";
import { useProjects } from "@/hooks/query/useProjects";

export const HomePage = () => {
  //const { data: projects, isLoading, isError } = useProjects();

  const [value, setValue] = useState("");

  // TODO: Loader
  /*  if (isLoading) return <h1>Loading...</h1>; */

  // TODO: Error product page
  /*  if (isError) return <h1>Loading...</h1>; */

  return (
    <div className="border-t">
      <div className="w-full max-w-[1200px] p-4 mx-auto">
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(9)
            .fill(0)
            .map(() => (
              <ProjectCard key={Math.random()} />
            ))}
        </div>
      </div>
    </div>
  );
};
