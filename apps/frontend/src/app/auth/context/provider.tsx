import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AUTH_ROUTES, PUBLIC_ROUTES, ROUTES } from "@/lib/routes";

import { TOKEN_KEY } from "./constants";
import { AuthContext } from "./index";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname as ROUTES);
  const isPrivateRoute = !isPublicRoute;
  const isAuthRoute = AUTH_ROUTES.includes(pathname as ROUTES);

  const accessToken = localStorage.getItem(TOKEN_KEY);

  useEffect(() => {
    if (isPrivateRoute && !accessToken) navigate("/login");

    if (isAuthRoute && accessToken) navigate("/");
  }, [accessToken, isAuthRoute, isPrivateRoute, navigate]);

  function saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);

    navigate("/");
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);

    navigate("/login");
  }

  const actions = { saveToken, logout };

  return <AuthContext.Provider value={{ actions }}>{children}</AuthContext.Provider>;
};
