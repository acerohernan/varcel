import { Router } from "express";

import { userRouter } from "./user";
import { authRouter } from "./auth";

export const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/user", userRouter);
