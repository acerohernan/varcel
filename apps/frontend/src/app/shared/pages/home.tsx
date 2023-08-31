import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { LuGitBranch } from "react-icons/lu";
import { RiCloseCircleLine } from "react-icons/ri";
import { AiFillGithub, AiOutlinePlus } from "react-icons/ai";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { useUser } from "@/hooks/query/useUser";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/app/auth/context";

export const HomePage = () => {
  const { data: user, isLoading, isError } = useUser();
  const {
    actions: { logout },
  } = useAuthContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  useEffect(() => {
    if (isLoading) return;

    // If there's an error retrieving the user, notify and remove their credentials
    if (isError || !user) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Your credentials are expired or invalid! Please log in again.",
        variant: "destructive",
      });

      logout();
    }
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="text-lg flex-shrink-0">
              <AiOutlinePlus />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white dark:bg-black">
            <DropdownMenuItem className="px-3" onClick={() => navigate("/new")}>
              Project
            </DropdownMenuItem>
            <DropdownMenuItem className="px-3">Domain</DropdownMenuItem>
            <DropdownMenuItem className="px-3">Storage</DropdownMenuItem>
            <DropdownMenuItem className="px-3">Team</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(9)
          .fill(0)
          .map(() => (
            <Card className="w-full bg-background" key={Math.random()}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img className="w-8 h-8 rounded-full" src="https://vercel.com/api/www/avatar?u=acerohernan&s=44" />
                  <div>
                    <CardTitle className="font-normal text-md">aws-clone</CardTitle>
                    <CardDescription>aws-clone.vercel.app</CardDescription>
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
          ))}
      </div>
    </div>
  );
};
