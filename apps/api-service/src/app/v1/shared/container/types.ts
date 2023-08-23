export const CONTAINER_TYPES = {
  /* Controllers */
  AuthController: Symbol.for("AuthController"),
  UserController: Symbol.for("UserController"),

  /* Services */
  AuthService: Symbol.for("AuthService"),
  UserService: Symbol.for("UserService"),
  JWTService: Symbol.for("JWTService"),

  /* Repositories */
  UserRepository: Symbol.for("UserRepository"),
  UserGhIntegrationRepository: Symbol.for("UserGhIntegrationRepository"),
};
