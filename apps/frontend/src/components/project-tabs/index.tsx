import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { PROJECT_TABS } from "@/lib/tabs";
import { PROJECT_PLACEHOLDER } from "@/lib/routes";

import { useProject } from "@/hooks/query/useProject";

import { Tab, Tabs } from "../ui/tabs";
import { ProjectTabsSkeleton } from "./skeleton";

export const ProjectTabs = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { projectName } = useParams();

  useEffect(() => {
    if (!projectName) navigate("/");
  }, []);

  if (!projectName) return null;

  const { data: project, isLoading, isError } = useProject({ projectName });

  if (isLoading) return <ProjectTabsSkeleton />;

  if (isError || !project) return <h1>An error happened!</h1>;

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
