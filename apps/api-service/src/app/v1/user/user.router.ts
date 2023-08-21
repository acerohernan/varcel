import Router from "express-promise-router";

import { verifyJwt } from "../shared/middlewares/verifyJwt";

import {
  getRepositoriesHandler,
  setupGithubIntegrationHandler,
} from "./user.controller";

export const userRouter = Router();

userRouter.get("/repository/github/setup", setupGithubIntegrationHandler);

userRouter.get("/repository", verifyJwt, getRepositoriesHandler);
