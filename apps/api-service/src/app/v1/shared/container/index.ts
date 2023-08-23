import { Container } from "inversify";

import { AuthService } from "@v1/auth/services/auth.service";
import { AuthController } from "@v1/auth/auth.controller";
import { UserController } from "@v1/user/user.controller";
import { UserService } from "@v1/user/services/user.service";

import { JWTService } from "../services/jwt.service";

import { CONTAINER_TYPES } from "./types";
import { UserRepository } from "../repositories/user.repository";
import { UserGhIntegrationRepository } from "../../user/repositories/user-gh-integration.repository";
import { ProjectController } from "@v1/project/project.controller";
import { ProjectService } from "@v1/project/services/project.service";
import { ProjectRepository } from "@v1/project/repositories/project.repository";

export const container = new Container();

/* Containers */
container.bind(CONTAINER_TYPES.AuthController).to(AuthController);
container.bind(CONTAINER_TYPES.UserController).to(UserController);
container.bind(CONTAINER_TYPES.ProjectController).to(ProjectController);

/* Services */
container.bind(CONTAINER_TYPES.JWTService).to(JWTService);
container.bind(CONTAINER_TYPES.AuthService).to(AuthService);
container.bind(CONTAINER_TYPES.UserService).to(UserService);
container.bind(CONTAINER_TYPES.ProjectService).to(ProjectService);

/* Repositories */
container.bind(CONTAINER_TYPES.UserRepository).to(UserRepository);
container.bind(CONTAINER_TYPES.ProjectRepository).to(ProjectRepository);
container
  .bind(CONTAINER_TYPES.UserGhIntegrationRepository)
  .to(UserGhIntegrationRepository);
