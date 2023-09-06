import { authHeaders, axiosInstance } from "../config";

export function getProjects() {
  return axiosInstance.get("/project", { headers: authHeaders() });
}
