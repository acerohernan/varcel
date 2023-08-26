export const CONTAINER_TYPES = {
  /* Controllers */
  AuthController: Symbol.for("AuthController"),
  UserController: Symbol.for("UserController"),
  ProjectController: Symbol.for("ProjectController"),

  /* Services */
  JWTService: Symbol.for("JWTService"),
  AuthService: Symbol.for("AuthService"),
  UserService: Symbol.for("UserService"),
  ProjectService: Symbol.for("ProjectService"),
  DeploymentService: Symbol.for("DeploymentService"),

  /* Repositories */
  UserRepository: Symbol.for("UserRepository"),
  UserGhIntegrationRepository: Symbol.for("UserGhIntegrationRepository"),
  ProjectRepository: Symbol.for("ProjectRepository"),
  DeploymentRepository: Symbol.for("DeploymentRepository"),
};
