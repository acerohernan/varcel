import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { LuGitBranch, LuGitCommit } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import deploymentScreenshootSrc from "@/assets/images/deployment-screenshoot.png";

export const ProjectPage = () => {
  const projectName = "aws-clone";

  return (
    <div>
      <div className="bg-background border-b">
        <div className="p-8 max-w-[1300px] mx-auto grid gap-6 md:flex md:justify-between items-center">
          <h1 className="text-3xl">{projectName}</h1>
          <div className="flex gap-4">
            <Button>Visit</Button>
            <Button variant="outline">Domains</Button>
            <Button variant="outline">Git Repository</Button>
          </div>
        </div>
      </div>
      <div className="p-8 my-4 max-w-[1300px] mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">Production Deployment</h1>
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline">Build Logs</Button>
            <Button variant="outline">Runtime Logs</Button>
            <Button variant="outline" className="flex items-center gap-2">
              <BsArrowCounterclockwise />
              Instant Rollback
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground mt-3 text-sm">The deployment that is available to your visitors.</p>
        <div className="mt-8">
          <Card className="w-full mx-auto bg-background">
            <CardContent className="">
              <div className="pt-6 grid gap-8 md:grid-cols-2">
                <img
                  src={deploymentScreenshootSrc}
                  alt="deployment-image"
                  className="rounded-md border object-cover w-full h-full"
                />
                <div className="grid gap-4 text-sm">
                  <div>
                    <span className="block font-light text-muted-foreground">Deployment</span>
                    <Link to={`/projects/${projectName}/deployments/deploymentId`}>
                      <p className="hover:underline cursor-pointer mt-1">portfolio-enxi06vwg-acerohernan.vercel.app</p>
                    </Link>
                  </div>
                  <div>
                    <span className="block font-light text-muted-foreground">Domain</span>
                    <p className="flex gap-2 items-center  hover:underline cursor-pointer mt-1">
                      {projectName}.station.lat
                      <FiExternalLink />
                    </p>
                  </div>
                  <div>
                    <span className="block font-light text-muted-foreground">Status</span>
                    <p className="flex gap-2 items-center  mt-1">
                      <span className="h-[10px] w-[10px] rounded-full bg-green-400" />
                      Ready
                    </p>
                  </div>
                  <div>
                    <span className="block font-light text-muted-foreground">Created</span>
                    <p className=" mt-1">96d ago by acerohernan</p>
                  </div>
                  <div className="grid gap-1 text-muted-foreground">
                    <span className="block font-light">Source</span>
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
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
