import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { LuGitBranch, LuGitCommit } from "react-icons/lu";

import deploymentScreenshootSrc from "@/assets/images/deployment-screenshoot.png";
import { Button } from "@/components/ui/button";

export const DeploymentPage = () => {
  const projectName = "aws-clone";

  return (
    <div className="bg-background">
      <div className="max-w-[1200px] mx-auto p-8">
        <div className="pt-6 grid gap-8 md:grid-cols-2">
          <div className="flex-shrink-0">
            <img
              src={deploymentScreenshootSrc}
              alt="deployment-image"
              className="rounded-md border object-cover w-full min-h-[300px]"
            />
            <div className="flex gap-4 mt-4">
              <Button size="icon" variant="outline">
                <PiDotsThreeOutlineVerticalFill />
              </Button>
              <Button className="w-[200px]">Visit</Button>
            </div>
          </div>
          <div className="grid gap-4 text-sm">
            <div>
              <span className="block font-light text-muted-foreground">Status</span>
              <p className="flex gap-2 items-center mt-1">
                <span className="h-[10px] w-[10px] rounded-full bg-green-400" />
                Ready
              </p>
            </div>
            <div>
              <span className="block font-light text-muted-foreground">Environment</span>
              <p className="mt-1">Production</p>
            </div>
            <div>
              <span className="block font-light text-muted-foreground">Duration</span>
              <p className="mt-1">42s (41d ago)</p>
            </div>
            <div>
              <span className="block font-light text-muted-foreground">Domain</span>
              <p className="flex gap-2 items-center  hover:underline cursor-pointer mt-1">
                {projectName}.station.lat
                <FiExternalLink />
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
      </div>
    </div>
  );
};
