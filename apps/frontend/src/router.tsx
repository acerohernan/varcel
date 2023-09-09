import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "./app/auth/pages/login";
import { SignUpPage } from "./app/auth/pages/signup";

import { HomePage } from "./app/shared/pages/home";
import { NotFoundPage } from "./app/shared/pages/404";

import { NewProjectPage } from "./app/project/pages/new";
import { ImportProjectPage } from "./app/project/pages/import/index";
import { ProjectPage } from "./app/project/pages/project";
import { AllDeploymentsPage } from "./app/project/pages/all-deployments";
import { DeploymentPage } from "./app/project/pages/deployment";

import Provider from "./provider";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Provider />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "new",
        element: <NewProjectPage />,
      },
      {
        path: "new/import",
        element: <ImportProjectPage />,
      },
      {
        path: "projects/:projectName",
        element: <ProjectPage />,
      },
      {
        path: "projects/:projectName/deployments",
        element: <AllDeploymentsPage />,
      },
      {
        path: "projects/:projectName/deployments/:deploymentId",
        element: <DeploymentPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
