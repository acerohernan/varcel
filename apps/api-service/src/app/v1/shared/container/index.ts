import { Container } from "inversify";

import { AuthService } from "@v1/auth/services/auth.service";
import { AuthController } from "@v1/auth/auth.controller";
import { UserController } from "@v1/user/user.controller";
import { UserService } from "@v1/user/services/user.service";
import { ProjectController } from "@v1/project/project.controller";
import { ProjectService } from "@v1/project/services/project.service";
import { WebhooksController } from "@v1/webhooks/webhooks.controller";
import { DeploymentService } from "@v1/project/services/deployment.service";
import { ProjectRepository } from "@v1/project/repositories/project.repository";
import { GithubWebhooksService } from "@v1/webhooks/services/gh-webhooks.service";
import { DeploymentRepository } from "@v1/project/repositories/deployment.repository";

import { JWTService } from "../services/jwt.service";
import { GithubService } from "../services/github.service";
import { UserRepository } from "../repositories/user.repository";
import { UserGhIntegrationRepository } from "../../user/repositories/user-gh-integration.repository";

import { CONTAINER_TYPES } from "./types";
import { RealtimeService } from "../services/realtime.service";

export const container = new Container();

/* Containers */
container.bind(CONTAINER_TYPES.AuthController).to(AuthController);
container.bind(CONTAINER_TYPES.UserController).to(UserController);
container.bind(CONTAINER_TYPES.ProjectController).to(ProjectController);
container.bind(CONTAINER_TYPES.WebhooksController).to(WebhooksController);

/* Services */
container.bind(CONTAINER_TYPES.JWTService).to(JWTService);
container.bind(CONTAINER_TYPES.GithubService).to(GithubService);
container.bind(CONTAINER_TYPES.RealtimeService).to(RealtimeService);
container.bind(CONTAINER_TYPES.AuthService).to(AuthService);
container.bind(CONTAINER_TYPES.UserService).to(UserService);
container.bind(CONTAINER_TYPES.ProjectService).to(ProjectService);
container.bind(CONTAINER_TYPES.DeploymentService).to(DeploymentService);
container.bind(CONTAINER_TYPES.GithubWebhookService).to(GithubWebhooksService);

/* Repositories */
container.bind(CONTAINER_TYPES.UserRepository).to(UserRepository);
container
  .bind(CONTAINER_TYPES.UserGhIntegrationRepository)
  .to(UserGhIntegrationRepository);
container.bind(CONTAINER_TYPES.ProjectRepository).to(ProjectRepository);
container.bind(CONTAINER_TYPES.DeploymentRepository).to(DeploymentRepository);
