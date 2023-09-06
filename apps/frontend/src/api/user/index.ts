import { authHeaders, axiosInstance } from "../config";

export function getUser() {
  return axiosInstance.get("/user", { headers: authHeaders() });
}
