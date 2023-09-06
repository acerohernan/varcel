import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

const Tabs: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="bg-background px-3 flex overflow-x-auto border-b">{children}</div>;
};

interface TabProps extends PropsWithChildren {
  active?: boolean;
}

const Tab: React.FC<TabProps> = ({ active, children }) => {
  return (
    <div>
      <span
        className={cn(
          "block text-sm py-2 px-3 hover:bg-accent hover:text-black dark:hover:text-white transition-all rounded-md",
          !active && "text-gray-400",
        )}
      >
        {children}
      </span>
      {active && <div className="flex border-b-2 h-1 border-black dark:border-white mx-3" />}
    </div>
  );
};

export { Tabs, Tab };
