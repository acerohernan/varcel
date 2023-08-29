import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { TOKEN_KEY, AUTH_ROUTES, PUBLIC_ROUTES } from "./constants";
import { AuthContext } from "./index";
import { Navbar } from "@/components/navbar";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isPrivateRoute = !isPublicRoute;
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

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

  return (
    <AuthContext.Provider value={{ actions }}>
      {isPrivateRoute ? <Navbar /> : null}
      {children}
    </AuthContext.Provider>
  );
};
