import { Router } from "express";

import { v1Router } from "@/app/v1/routers";

export const router = Router();

router.use("/v1", v1Router);
