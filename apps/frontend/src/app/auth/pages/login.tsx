import { useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { TOKEN_KEY } from "../context/constants";
import { useAuthContext } from "../context";
import { SocialLoginForm } from "../components/social-login";

export const LoginPage = () => {
  const [params] = useSearchParams();
  const {
    actions: { saveToken },
  } = useAuthContext();
  const navigate = useNavigate();

  const token: string | null = useMemo(() => params.get(TOKEN_KEY), [params]);

  useEffect(() => {
    if (!token) return;

    // If there's a token in query params, save it
    saveToken(token);
  }, [navigate, token]);

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-10">Log in to Latin Station</h1>
        <SocialLoginForm />
        <span className="block text-center text-muted-foreground mt-8">
          Don't have an account?{" "}
          <Link to="/signup" className="text-secondary-foreground hover:underline">
            Create one
          </Link>
        </span>
      </div>
    </div>
  );
};
