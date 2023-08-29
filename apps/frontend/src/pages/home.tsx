import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/auth";
import { useUser } from "@/hooks/query/useUser";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AiFillGithub } from "react-icons/ai";
import { LuGitBranch } from "react-icons/lu";

export const HomePage = () => {
  const { data: user, isLoading, isError } = useUser();
  const {
    actions: { logout },
  } = useAuthContext();
  const { toast } = useToast();

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
