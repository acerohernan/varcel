import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "@/app/auth/pages/login";

import { HomePage } from "@/app/shared/pages/home";
import { NotFoundPage } from "@/app/shared/pages/404";

import { NewProjectPage } from "@/app/project/pages/new";

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
        path: "new",
        element: <NewProjectPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
