import { PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AUTH_ROUTES, PUBLIC_ROUTES, ROUTES } from "@/lib/routes";
import { Navbar } from "../navbar";

export const UILayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname as ROUTES);
  const isPrivateRoute = !isPublicRoute;
  const isProjectRoute = pathname.includes("/project");

  console.log({ isProjectRoute });

  return (
    <div>
      {isPrivateRoute ? <Navbar /> : null}
      {isProjectRoute ? <h1>Project tabs</h1> : null}
      {children}
    </div>
  );
};
