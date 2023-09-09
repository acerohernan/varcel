import Router from "express-promise-router";

import { verifyJwt } from "@v1/shared/middlewares/verifyJwt";
import { container } from "@v1/shared/container";
import { CONTAINER_TYPES } from "@v1/shared/container/types";

import { UserController } from "./user.controller";

export const userRouter = Router();

const controller = container.get<UserController>(
  CONTAINER_TYPES.UserController
);

userRouter.get("/", verifyJwt, (req, res) =>
  controller.getUserHandler(req, res)
);

userRouter.get("/repository/github/setup", (req, res) =>
  controller.setupGithubIntegrationHandler(req, res)
);

userRouter.get("/repository", verifyJwt, (req, res) =>
  controller.getRepositoriesHandler(req, res)
);

userRouter.get("/get-repo", verifyJwt, (req, res) =>
  controller.getRepositoryHandler(req, res)
);
