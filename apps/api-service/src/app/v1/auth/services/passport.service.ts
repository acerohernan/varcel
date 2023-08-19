import passportInstance from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

import { env } from "@/config/env";

export const passport = passportInstance;

passport.use(
  new GitHubStrategy(
    {
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/v1/auth/github/callback",
    },
    (
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: (arg0: null, arg1: any) => void
    ) => {
      if (profile && profile._json) return done(null, profile._json);

      return done(null, null);
    }
  )
);
