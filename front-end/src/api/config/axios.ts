import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosApi = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosApi.interceptors.request.use(
  async (config) => {
    if (config.url?.startsWith("/auth/login")) {
      return config;
    }
    const token = localStorage.getItem("access_token");
    if (!token) {
      return config;
    }

    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    return config;
  },
  (error) => {
    const e = error as AxiosError;
    console.log("[AXIOS ERRRROR URL]", e.response?.request);
    console.log("[AXIOS ERRRROR]", e.response?.data);
    Promise.reject(error);
  }
);
axiosApi.interceptors.request.use((request) => {
  console.log(`[API Request] ${request.method?.toUpperCase()} ${request.url}`);
  return request;
});
// Response interceptor for API calls
axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
    }

    const e = error as AxiosError;
    console.log("[AXIOS ERRRROR URL]", e.response?.request._url);
    console.log("[AXIOS ERRRROR]", e.response?.data);
    return Promise.reject(error);
  }
);

export default axiosApi;
