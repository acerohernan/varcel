import Router from "express-promise-router";

import { container } from "@v1/shared/container";
import { CONTAINER_TYPES } from "@v1/shared/container/types";

import { ProjectController } from "./project.controller";
import { verifyJwt } from "@v1/shared/middlewares/verifyJwt";

export const projectRouter = Router();

const controller = container.get<ProjectController>(
  CONTAINER_TYPES.ProjectController
);

projectRouter.post("/", verifyJwt, (req, res) =>
  controller.createProjectHandler(req, res)
);

projectRouter.post("/:projectId/deployment", verifyJwt, (req, res) =>
  controller.createDeploymentHandler(req, res)
);
