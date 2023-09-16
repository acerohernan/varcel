import { Link, useParams } from "react-router-dom";
import { LuGitBranch, LuGitCommit } from "react-icons/lu";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DeploymentMenu } from "../components/deployment-menu";
import { useDeployments } from "@/hooks/query/useDeployments";

export const AllDeploymentsPage = () => {
  const { projectName } = useParams();

  if (!projectName) return null;

  const { data: deployments, isLoading, isError } = useDeployments({ projectId: projectName });

  console.log(deployments);

  return (
    <div>
      <div className="bg-background border-b">
        <div className="p-8 max-w-[1300px] mx-auto grid gap-6 md:flex md:justify-between items-center">
          <h1 className="text-3xl">Deployments</h1>
        </div>
      </div>
      <div className="grid px-8 my-4 gap-4 max-w-[1300px] mx-auto">
        {Array(5)
          .fill(0)
          .map(() => (
            <Card className="bg-background" key={Math.random()}>
              <CardContent className="pt-6 text-sm">
                <div className="grid grid-cols-[1fr_40px]">
                  <div className="grid gap-1">
                    <Link to="/projects/aws-clone/deployments/deploymentId">
                      aws-clone-qshf6ql86-acerohernan.vercel.app
                    </Link>
                    <span className="block text-muted-foreground ">Production (Current)</span>
                  </div>
                  <DeploymentMenu />
                </div>
                <Separator className="my-4" />
                <div className="grid gap-1">
                  <p className="flex gap-2 items-center text-muted-foreground">
                    <span className="h-[10px] w-[10px] rounded-full bg-green-400" />
                    Ready
                  </p>
                  <span className="block text-muted-foreground">42s</span>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-1 text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <LuGitBranch /> main
                  </span>
                  <div className="flex items-center gap-2">
                    <LuGitCommit />
                    <a
                      className="hover:underline cursor-pointer"
                      href="https://github.com/acerohernan/portfolio/commit/266b0c179c36e806c7b945a5f2089d3eb712dbd6"
                      target="_blank"
                      rel="noreferrer"
                    >
                      266b0c1 build: Updating svg icons
                    </a>
                  </div>
                </div>
                <Separator className="my-4" />
                <span className="text-muted-foreground">96d ago by acerohernan</span>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};
