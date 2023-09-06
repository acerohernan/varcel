import axios from "axios";

import { TOKEN_KEY } from "@/app/auth/context/constants";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 10 seconds
});

export const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
});
