import { authHeaders, axiosInstance } from "../config";

export function getUser() {
  return axiosInstance.get("/user", { headers: authHeaders() });
}

export function getGitRepositories() {
  return axiosInstance.get("/user/repository", { headers: authHeaders() });
}

export function getGitReposity({ url }: { url: string }) {
  return axiosInstance.get(`/user/get-repo?url=${url}`, { headers: authHeaders() });
}

export function getGhIntegrationStatus() {
  return axiosInstance.get(`/user/integration/github/status`, { headers: authHeaders() });
}
