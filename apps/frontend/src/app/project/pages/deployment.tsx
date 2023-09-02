import { FiExternalLink } from "react-icons/fi";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { LuGitBranch, LuGitCommit } from "react-icons/lu";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import deploymentScreenshootSrc from "@/assets/images/deployment-screenshoot.png";
import { Button } from "@/components/ui/button";

export const DeploymentPage = () => {
  const projectName = "aws-clone";

  return (
    <div>
      <div className="bg-background border-y">
        <div className="max-w-[1200px] mx-auto px-8 py-12">
          <div className="grid lg:grid-cols-[1fr_208px] relative">
            <div className="grid gap-8 md:grid-cols-[400px_1fr]">
              <div className="flex-shrink-0">
                <img
                  src={deploymentScreenshootSrc}
                  alt="deployment-image"
                  className="rounded-md border object-cover w-full md:min-h-[250px]"
                />
                <div className="flex gap-4 mt-4 lg:mt-0 lg:absolute top-0 right-0">
                  <Button size="icon" variant="outline">
                    <PiDotsThreeOutlineVerticalFill />
                  </Button>
                  <Button className="w-[150px]">Visit</Button>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-sm">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
      <div className="bg-background border-b h-full">
        <div className="max-w-[1200px] mx-auto px-8 py-12">
          <h1 className="text-2xl font-medium">Deployment Details</h1>
          <div className="grid gap-4 mt-4 mb-8">
            <Accordion type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-muted-foreground">Building</AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-muted-foreground">Deployment summary</AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-muted-foreground">Running checks</AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-muted-foreground">Assigning Domains</AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};
