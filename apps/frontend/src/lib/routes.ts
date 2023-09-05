export enum ROUTES {
  LOGIN = "/login",
  SIGNUP = "/signup",
  HOME = "/",
}

export const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP];

export const PUBLIC_ROUTES = [...AUTH_ROUTES];
