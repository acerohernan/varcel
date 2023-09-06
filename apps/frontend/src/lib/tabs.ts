import { ROUTES } from "./routes";

interface ITab {
  label: string;
  route: ROUTES;
}

export const PROJECT_TABS: ITab[] = [
  {
    label: "Project",
    route: ROUTES.PROJECT,
  },
  {
    label: "Deployments",
    route: ROUTES.PROJECT_DEPLOYMENTS,
  },
];
export const DEPLOYMENT_TABS: ITab[] = [
  {
    label: "Deployment",
    route: ROUTES.DEPLOYMENT,
  },
];
