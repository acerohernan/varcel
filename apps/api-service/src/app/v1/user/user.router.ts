import { BadRequestError } from "@/lib/errors";
import Router from "express-promise-router";

export const userRouter = Router();

userRouter.get("/error", async (req, res) => {
  throw new BadRequestError(["Email not authorized"]);

  res.status(200).send();
});
