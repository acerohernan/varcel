import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/home";
import LoginPage from "./pages/auth/login";
import NotFoundPage from "./pages/404";

export const router = createBrowserRouter([
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
]);
