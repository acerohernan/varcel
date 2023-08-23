import Router from "express-promise-router";

import { container } from "@v1/shared/container";
import { CONTAINER_TYPES } from "@v1/shared/container/types";
import { passport } from "@v1/shared/lib/passport";

import { AuthController } from "./auth.controller";

export const authRouter = Router();

const controller = container.get<AuthController>(
  CONTAINER_TYPES.AuthController
);

authRouter.get("/github", passport.authenticate("github", { session: false }));

authRouter.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req, res) => controller.githubCallbackHandler(req, res)
);
