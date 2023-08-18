import express, { json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { env } from "@/config/env";
import { logger } from "@/config/logger";
import { router } from "./router";

const app = express();

app.use(helmet());
app.use(cors({ origin: "*" }));

app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(router);

app.listen(env.PORT, () => {
  logger.info(`Application is running on port ${env.PORT}`);
});
