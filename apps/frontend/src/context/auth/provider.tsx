import { PropsWithChildren } from "react";
import { AuthContext } from ".";
import { useLocation } from "react-router-dom";
import { publicRoutes } from "./constants";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();

  const isPublicRoute = publicRoutes.includes(pathname);
  const isPrivateRoute = !isPublicRoute;

  console.log({ pathname, isPrivateRoute, isPublicRoute });

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};
