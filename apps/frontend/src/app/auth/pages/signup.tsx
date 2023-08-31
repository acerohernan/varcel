import { Link } from "react-router-dom";

import { SocialLoginForm } from "../components/social-login";

export const SignUpPage = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-10">Create your account</h1>
        <SocialLoginForm />
        <span className="block text-center text-muted-foreground mt-8">
          Do you have an account?{" "}
          <Link to="/login" className="text-secondary-foreground hover:underline">
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
};
