import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/home";
import LoginPage from "./pages/auth/login";
import NotFoundPage from "./pages/404";

import Provider from "./provider";

export const router = createBrowserRouter([
  // Providers
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
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  /* {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  }, */
]);
