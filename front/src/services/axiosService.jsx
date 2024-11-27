import axios from "axios";
import refreshAccessToken from "../utils/refreshAccessToken";

export const createAxiosInstance = (getToken, refreshAccessToken) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Interceptor para añadir el token en las solicitudes
  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const tokenRefreshed = await refreshAccessToken();
          if (tokenRefreshed) {
            originalRequest.headers["Authorization"] = `Bearer ${getToken()}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error("Error al refrescar el token:", refreshError);
          if (refreshError.response?.status === 401) {
            localStorage.clear();
            window.location.reload();
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};
