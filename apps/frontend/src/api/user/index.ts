import { authHeaders, axiosInstance } from "../config";

export function getUser() {
  return axiosInstance.get("/user", { headers: authHeaders() });
}

export function getGitRepositories() {
  return axiosInstance.get("/user/repository", { headers: authHeaders() });
}
