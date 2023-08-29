import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "./components/ui/toaster";

import { AuthProvider } from "./context/auth/provider";
import { ThemeProvider } from "./theme/provider";

const queryClient = new QueryClient();

const Provider = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Provider;
