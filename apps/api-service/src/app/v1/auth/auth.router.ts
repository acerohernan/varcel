import Router from "express-promise-router";

import { passport } from "./services/passport.service";

import { githubCallbackHandler } from "./auth.controller";

export const authRouter = Router();

authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"], session: false })
);

authRouter.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  githubCallbackHandler
);
