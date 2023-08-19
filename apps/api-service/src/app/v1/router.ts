import Router from "express-promise-router";

import { userRouter } from "@v1/user/user.router";
import { authRouter } from "@v1/auth/auth.router";

export const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/user", userRouter);
