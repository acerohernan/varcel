
import { TOKEN_KEY } from "@/app/auth/context/constants";
import { axiosInstance } from "../config";

const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
});

export const getUser = () => axiosInstance.get("/user", { headers: headers() });
