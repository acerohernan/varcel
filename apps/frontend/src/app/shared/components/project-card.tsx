import { Link } from "react-router-dom";
import { LuGitBranch } from "react-icons/lu";
import { AiFillGithub } from "react-icons/ai";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { IProject } from "@/api/project/types";

interface Props {
  project: IProject;
}

export const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <Link to="/projects/aws-clone">
      <Card className="w-full bg-background hover:border-black dark:hover:border-white">
        <CardHeader>
          <div className="flex items-center gap-4">
            <img className="w-8 h-8 rounded-full" src="https://vercel.com/api/www/avatar?u=acerohernan&s=44" />
            <div>
              <CardTitle className="font-normal text-md">{project.name}</CardTitle>
              <CardDescription>{project.name}.vercel.app</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-sm">
            <p>build(web): Updating styles in Menu Component inside the dashboard page</p>
            <span className="flex items-center gap-1 font-light mt-2">
              <LuGitBranch />
              From master
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">36d ago vía</span>
            <span className="text-lg">
              <AiFillGithub />
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
