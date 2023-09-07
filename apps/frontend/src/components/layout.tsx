import { PropsWithChildren, useMemo } from "react";
import { useLocation } from "react-router-dom";

import {
  DEPLOYMENTS_ROUTES,
  DEPLOYMENT_PLACEHOLDER,
  PROJECT_PLACEHOLDER,
  PROJECT_ROUTES,
  PUBLIC_ROUTES,
  ROUTES,
  getDeploymentFromPath,
  getProjectFromPath,
} from "@/lib/routes";

import { Navbar } from "./navbar";
import { ProjectTabs } from "./project-tabs";
import { DeploymentTabs } from "./deployment-tabs";

export const UILayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname as ROUTES);

  const isPrivateRoute = !isPublicRoute;

  const isProjectRoute = useMemo<boolean>(() => {
    if (!pathname.includes("/projects")) return false;

    const actualProjectName = getProjectFromPath(pathname);

    const placeholderRoute = pathname.replace(actualProjectName, PROJECT_PLACEHOLDER);

    return PROJECT_ROUTES.includes(placeholderRoute as ROUTES);
  }, [pathname]);

  const isDeploymentRoute = useMemo<boolean>(() => {
    if (!pathname.includes("/deployments")) return false;

    const actualProjectName = getProjectFromPath(pathname);
    const actualDeployment = getDeploymentFromPath(pathname);

    const placeholderRoute = pathname
      .replace(actualProjectName, PROJECT_PLACEHOLDER)
      .replace(actualDeployment, DEPLOYMENT_PLACEHOLDER);

    return DEPLOYMENTS_ROUTES.includes(placeholderRoute as ROUTES);
  }, [pathname]);

  return (
    <div id="layout-div">
      {isPrivateRoute ? <Navbar /> : null}
      {isProjectRoute ? <ProjectTabs /> : null}
      {isDeploymentRoute ? <DeploymentTabs /> : null}
      {children}
    </div>
  );
};
