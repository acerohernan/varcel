import Router from "express-promise-router";

import { container } from "@v1/shared/container";
import { CONTAINER_TYPES } from "@v1/shared/container/types";

import { ProjectController } from "./project.controller";

export const projectRouter = Router();

const controller = container.get<ProjectController>(
  CONTAINER_TYPES.ProjectController
);

projectRouter.post("/", (req, res) =>
  controller.createProjectHandler(req, res)
);

projectRouter.post("/:projectId/deployment", (req, res) =>
  controller.createProjectDeploymentHandler(req, res)
);
