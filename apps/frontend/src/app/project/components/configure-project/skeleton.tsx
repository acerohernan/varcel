import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ConfigureProjectCardSkeleton = () => {
  return (
    <Card className="w-full mx-auto bg-background">
      <CardHeader>
        <CardTitle className="font-medium pb-4">Configure Project</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
          <Skeleton className="w-full h-[40px]" />
          <Skeleton className="w-full h-[40px]" />
          <Skeleton className="w-full h-[40px]" />
          <div className="grid gap-4">
            <Skeleton className="w-full h-[40px]" />
          </div>
          <Button type="submit" className="mt-2" disabled>
            Deploy
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
