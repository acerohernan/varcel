import Router from "express-promise-router";

import { BadRequestError } from "@/lib/errors";

export const userRouter = Router();

userRouter.get("/error", async (req, res) => {
  throw new BadRequestError(["Email not authorized"]);

  res.status(200).send();
});
