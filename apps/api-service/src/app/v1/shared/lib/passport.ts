import passportInstance from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

import { env } from "@/config/env";

export const passport = passportInstance;

passport.use(
  new GitHubStrategy(
    {
      clientID: env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: env.GITHUB_OAUTH_CLIENT_SECRET,
      callbackURL: `${env.BASE_URL}/v1/auth/github/callback`,
      scope: ["user:email"],
    },
    (
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: (arg0: null, arg1: any) => void
    ) => {
      return done(null, profile);
    }
  )
);
