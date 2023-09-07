import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { cn } from "@/lib/utils";

export const ImportRepositoryCardSkeleton = () => {
  return (
    <Card className="w-full max-w-[800px] mx-auto bg-background">
      <CardHeader>
        <CardTitle className="text-center font-medium">Import Git Repository</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 h-[40px]">
          <Skeleton />
          <Skeleton />
        </div>
        <Card className="dark:bg-black mt-4">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                className={cn("p-4 flex items-center justify-between", index !== 4 && "border-b")}
                key={Math.random()}
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="rounded-full w-[24px] h-[24px]" />
                  <Skeleton
                    className="h-[10px]"
                    style={{
                      width: Math.floor(Math.random() * (150 - 80 + 1)) + 90,
                    }}
                  />
                </div>
                <Skeleton className="w-[80px] h-[40px]" />
              </div>
            ))}
        </Card>
      </CardContent>
    </Card>
  );
};
