import { authHeaders, axiosInstance } from "../config";

export function getProjects() {
  return axiosInstance.get("/project", { headers: authHeaders() });
}

export function createProject(formValues: {}) {
  return axiosInstance.post("/project", formValues, { headers: authHeaders() });
}
