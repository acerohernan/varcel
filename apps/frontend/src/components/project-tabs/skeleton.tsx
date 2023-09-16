import { PROJECT_TABS } from "@/lib/tabs";

import { Skeleton } from "../ui/skeleton";

export const ProjectTabsSkeleton = () => {
  return (
    <div className="bg-background flex gap-2 border-b px-3">
      {PROJECT_TABS.map(() => {
        return <Skeleton className="w-[80px] h-[35px] mb-2" key={Math.random()} />;
      })}
    </div>
  );
};
