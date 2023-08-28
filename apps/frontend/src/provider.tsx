import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "./components/ui/toaster";

import { AuthProvider } from "./context/auth/provider";

const queryClient = new QueryClient();

const Provider = () => {
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default Provider;
