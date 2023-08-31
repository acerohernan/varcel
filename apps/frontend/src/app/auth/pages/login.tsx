import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { FaGitlab } from "react-icons/fa";
import { IoLogoBitbucket } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { useAuthContext } from "../context";
import { TOKEN_KEY } from "../context/constants";

export const LoginPage = () => {
  const [params] = useSearchParams();
  const {
    actions: { saveToken },
  } = useAuthContext();
  const navigate = useNavigate();

  const token: string | null = useMemo(() => params.get(TOKEN_KEY), [params]);

  useEffect(() => {
    if (!token) return;

    // If there's a token in query params, save it
    saveToken(token);
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
            asChild
            className="w-full text-md flex items-center justify-center gap-2"
          >
            <a className="cursor-pointer" href={`${import.meta.env.VITE_API_URL}/auth/github`}>
              <div className="text-2xl">
                <AiFillGithub />
              </div>
              Continue with Github
            </a>
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
