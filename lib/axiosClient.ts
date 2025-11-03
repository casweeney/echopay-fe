import axios from "axios";
import { getAuthToken } from "@/utils/token";

const axiosClient = axios.create({
  baseURL: "    ",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
