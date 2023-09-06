import { Link, useLocation } from "react-router-dom";

import { PROJECT_TABS } from "@/lib/tabs";
import { PROJECT_PLACEHOLDER, getProjectFromPath } from "@/lib/routes";

import { Tab, Tabs } from "./ui/tabs";

export const ProjectTabs = () => {
  const { pathname } = useLocation();

  const projectName = getProjectFromPath(pathname);

  return (
    <Tabs>
      {PROJECT_TABS.map((item) => {
        const actualRoute = item.route.replace(PROJECT_PLACEHOLDER, projectName);

        const active = actualRoute === pathname;

        return (
          <Link key={item.label} to={actualRoute}>
            <Tab active={active}>{item.label}</Tab>
          </Link>
        );
      })}
    </Tabs>
  );
};
