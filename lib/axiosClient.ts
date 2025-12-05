import axios from "axios";
import { getAuthToken } from "@/utils/token";

const axiosClient = axios.create({
  baseURL: "https://resolvalabs.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  // Only attach JWT if the request did not specify a custom API key header
  if (token && !config.headers["x-api-key"]) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // If using an API key, swap it into Authorization
  if (config.headers["x-api-key"]) {
    const apiKey = config.headers["x-api-key"];
    config.headers.Authorization = `Bearer ${apiKey}`;

    // Remove custom header to avoid sending it to server
    delete config.headers["x-api-key"];
  }
  return config;
});

export default axiosClient;
