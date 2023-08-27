import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/auth/provider";

const Provider = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default Provider;
