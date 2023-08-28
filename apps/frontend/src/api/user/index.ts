import { axiosInstance } from "../config";

const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getUser = () => axiosInstance.get("/user", { headers: headers() });
