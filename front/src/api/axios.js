import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
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
    const refreshToken = localStorage.getItem("refresh_token");
    if (error.responseh.status === 401 && refreshToken) {
      try {
        const res = await api.post("/refresh_token", {
          refresh_token: refreshToken,
        });
        const { access_token, refresh_token: newRefreshToken } = res.data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", newRefreshToken);

        error.config.headers["Authorization"] = `Bearer ${access_token}`;
        return api(error.config);
      } catch (err) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
