import axios from "axios";
import { clearAuth } from "@/features/auth/authStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const isAuthEndpoint =
      originalRequest?.url?.includes("/auth/login/") ||
      originalRequest?.url?.includes("/auth/refresh/");

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      isAuthEndpoint
    ) {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      clearAuth();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newAccessToken) => {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      });
    }

    isRefreshing = true;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/accounts/auth/refresh/`,
        {
          refresh: refreshToken,
        }
      );

      const newAccessToken = response.data.access;

      localStorage.setItem("access_token", newAccessToken);

      api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);

      clearAuth();
      window.location.href = "/login";

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);