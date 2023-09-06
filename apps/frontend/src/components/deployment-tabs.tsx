import { DEPLOYMENT_PLACEHOLDER, PROJECT_PLACEHOLDER, getDeploymentFromPath, getProjectFromPath } from "@/lib/routes";
import { Link, useLocation } from "react-router-dom";
import { Tab, Tabs } from "./ui/tabs";
import { DEPLOYMENT_TABS } from "@/lib/tabs";

export const DeploymentTabs = () => {
  const { pathname } = useLocation();

  const projectName = getProjectFromPath(pathname);
  const deploymentId = getDeploymentFromPath(pathname);

  return (
    <Tabs>
      {DEPLOYMENT_TABS.map((item) => {
        const actualRoute = item.route
          .replace(PROJECT_PLACEHOLDER, projectName)
          .replace(DEPLOYMENT_PLACEHOLDER, deploymentId);

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
