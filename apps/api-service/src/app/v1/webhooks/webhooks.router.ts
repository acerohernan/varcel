import Router from "express-promise-router";

import { container } from "@v1/shared/container";
import { CONTAINER_TYPES } from "@v1/shared/container/types";

import { WebhooksController } from "./webhooks.controller";

export const webhooksRouter = Router();

const controller = container.get<WebhooksController>(
  CONTAINER_TYPES.WebhooksController
);

webhooksRouter.post("/github", (req, res) =>
  controller.githubHandler(req, res)
);
