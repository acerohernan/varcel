import { authHeaders, axiosInstance } from "../config";
import { ICreateProjectFormValues } from "./schemas";

export function getProjects() {
  return axiosInstance.get("/project", { headers: authHeaders() });
}

export function getProject({ projectName }: { projectName: string }) {
  return axiosInstance.get(`/project/${projectName}`, { headers: authHeaders() });
}

export function createProject(formValues: ICreateProjectFormValues) {
  return axiosInstance.post("/project", formValues, { headers: authHeaders() });
}

export function getDeployments({ projectName }: { projectName: string }) {
  return axiosInstance.get(`/project/${projectName}/deployment`, { headers: authHeaders() });
}
