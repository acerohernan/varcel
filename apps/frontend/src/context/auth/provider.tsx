import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { authRoutes, publicRoutes } from "./constants";
import { AuthContext } from "./index";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isPublicRoute = publicRoutes.includes(pathname);
  const isPrivateRoute = !isPublicRoute;
  const isAuthRoute = authRoutes.includes(pathname);

  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    if (isPrivateRoute && !accessToken) navigate("/login");

    if (isAuthRoute && accessToken) navigate("/");
  }, [accessToken, isAuthRoute, isPrivateRoute, navigate]);

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};
