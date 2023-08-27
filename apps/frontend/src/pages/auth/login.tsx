import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useMemo } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaGitlab } from "react-icons/fa";
import { IoLogoBitbucket } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";

const LoginPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token: string | null = useMemo(() => params.get("token"), [params]);

  useEffect(() => {
    if (!token) return;

    localStorage.setItem("token", token);

    navigate("/");
  }, [navigate, token]);

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-10">Log in to Latin Station</h1>
        <div className="grid gap-4">
          <Button
            variant="outline"
            size="lg"
            type="button"
            className="w-full text-md flex items-center justify-center gap-2"
          >
            <div className="text-2xl">
              <AiFillGithub />
            </div>
            Continue with Github
          </Button>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    variant="outline"
                    size="lg"
                    type="button"
                    className="w-full text-md flex items-center justify-center gap-2 bg-violet-700"
                    disabled
                  >
                    <div className="text-xl">
                      <FaGitlab />
                    </div>
                    Continue with Gitlab
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Soon...</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    variant="outline"
                    size="lg"
                    type="button"
                    disabled
                    className="w-full text-md flex items-center justify-center gap-2 bg-blue-600"
                  >
                    <div className="text-2xl">
                      <IoLogoBitbucket />
                    </div>
                    Continue with Bitbucket
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Soon...</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
