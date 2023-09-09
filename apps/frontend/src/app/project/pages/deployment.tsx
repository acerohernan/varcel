import { FiExternalLink } from "react-icons/fi";

import { LuGitBranch, LuGitCommit } from "react-icons/lu";
import { MdContentCopy } from "react-icons/md";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import deploymentScreenshootSrc from "@/assets/images/deployment-screenshoot.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { DeploymentMenu } from "../components/deployment-menu";

const buildLogs = Array(8).fill({
  timestamp: Date.now(),
  message: "Cloning github.com/acerohernan/aws-clone (Branch: master, Commit: 75afcac)",
}) as Array<{ timestamp: number; message: string }>;

export const DeploymentPage = () => {
  const projectName = "aws-clone";

  const [logsType, setLogsType] = useState<"all" | "error" | "warn">("all");

  return (
    <div>
      <div className="bg-background border-y">
        <div className="max-w-[1300px] mx-auto px-8 py-12">
          <div className="grid lg:grid-cols-[1fr_208px] relative">
            <div className="grid gap-8 md:grid-cols-[400px_1fr]">
              <div className="flex-shrink-0">
                <img
                  src={deploymentScreenshootSrc}
                  alt="deployment-image"
                  className="rounded-md border object-cover w-full md:min-h-[250px]"
                />
                <div className="flex gap-4 mt-4 lg:mt-0 lg:absolute top-0 right-0">
                  <DeploymentMenu />
                  <Button className="w-[150px]">Visit</Button>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-sm">
                <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
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
      <div className="h-full">
        <div className="max-w-[1300px] mx-auto px-8 py-12">
          <h1 className="text-2xl font-medium">Deployment Details</h1>
          <div className="grid gap-4 mt-4">
            <Accordion type="multiple" className="bg-background" defaultValue={["item-1", "item-2"]}>
              <AccordionItem value="item-1" className="p-0">
                <AccordionTrigger className="text-muted-foreground px-4">Building</AccordionTrigger>
                <AccordionContent>
                  <div className="relative border-t pt-4">
                    <div className="w-full flex gap-2 px-4">
                      <button onClick={() => setLogsType("all")}>
                        <Badge className="cursor-pointer" variant={logsType === "all" ? "default" : "secondary"}>
                          All Logs (37)
                        </Badge>
                      </button>
                      <button onClick={() => setLogsType("error")}>
                        <Badge className="cursor-pointer" variant={logsType === "error" ? "default" : "secondary"}>
                          Errors (0)
                        </Badge>
                      </button>
                      <button onClick={() => setLogsType("warn")}>
                        <Badge className="cursor-pointer" variant={logsType === "warn" ? "default" : "secondary"}>
                          Warnings (0)
                        </Badge>
                      </button>
                    </div>
                    <Button size="icon" variant="outline" className="text-lg absolute right-4 top-4">
                      <MdContentCopy />
                    </Button>
                    <div className="mt-4 grid">
                      {buildLogs.map((log) => {
                        return (
                          <div key={Math.random()} className="flex gap-2 font-light px-4 py-1 hover:bg-accent">
                            <span>10:10:39</span>
                            <p>{log.message}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="p-0">
                <AccordionTrigger className="text-muted-foreground px-4">Assigning Domains</AccordionTrigger>
                <AccordionContent>
                  <div className="border-t">
                    <div className="pt-4 px-4">
                      <div className="flex gap-4 items-center justify-between">
                        <div className="flex gap-2">
                          <div className="bg-blue-500 rounded-full p-1 text-lg">
                            <BiCheck />
                          </div>
                          <span className="flex items-center gap-1 hover:underline text-blue-400 cursor-pointer">
                            aws-clone.vercel.app
                            <FiExternalLink />
                          </span>
                        </div>
                        <div className="block text-muted-foreground text-end">Custom Domain</div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};
