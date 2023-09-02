import { BsArrowLeft, BsArrowRight, BsFolder } from "react-icons/bs";
import { LuGitBranch } from "react-icons/lu";
import { AiFillGithub } from "react-icons/ai";

import { ConfigureProjectCard } from "../components/configure-project";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { DeployProjectCard } from "../components/deploy-project";

export const ImportProjectPage = () => {
  return (
    <div className="relative">
      <div className="bg-white dark:bg-black absolute w-full top-0 h-[320px] lg:h-[280px] z-0 border-b" />
      <div className="p-8 max-w-[1200px] mx-auto relative z-10">
        <Link to="/new">
          <div className="flex items-center text-sm gap-1 text-muted-foreground hover:underline cursor-pointer mb-4">
            <BsArrowLeft />
            Back
          </div>
        </Link>
        <h1 className="text-[2.5rem] leading-[2.8rem]">You're almost done.</h1>
        <p className="text-muted-foreground mt-2 mb-8">
          Please follow the steps to configure your Project and deploy it.
        </p>
        <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-20">
          <div>
            <div className="bg-[#EAEAEA] dark:bg-[#333333] flex items-center gap-3 rounded-md p-6">
              <div className="text-3xl">
                <AiFillGithub />
              </div>
              <span>livekit-whiteboard</span>
            </div>
            <div className="hidden lg:grid mt-[80px] gap-1">
              <span className="text-muted-foreground text-[0.8rem] mb-3">GIT REPOSITORY</span>
              <div className="flex gap-1 items-center">
                <div className="text-xl">
                  <AiFillGithub />
                </div>
                <span className="text-sm">acerohernan/livekit-whiteboard</span>
              </div>
              <div className="flex gap-1 items-center mt-2 text-muted-foreground">
                <div className="text-xl">
                  <LuGitBranch />
                </div>
                <span className="text-sm">master</span>
              </div>
              <div className="flex gap-1 items-center mt-2 text-muted-foreground">
                <div className="text-xl">
                  <BsFolder />
                </div>
                <span className="text-sm">apps/web</span>
              </div>
              <Separator className="my-6" />

              <Link to="/new">
                <div className="flex text-sm items-center gap-1 text-muted-foreground hover:text-primary">
                  Import a different Git Repository
                  <BsArrowRight />
                </div>
              </Link>
            </div>
          </div>
          <div className="grid gap-10">
            <ConfigureProjectCard />
            <DeployProjectCard />
          </div>
        </div>
      </div>
    </div>
  );
};
