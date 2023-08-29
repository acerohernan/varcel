import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/auth/login";
import { NotFoundPage } from "./pages/404";

import Provider from "./provider";
import { NewProjectPage } from "./pages/project/new";

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
