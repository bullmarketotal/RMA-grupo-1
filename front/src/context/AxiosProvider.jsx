import React, { createContext, useContext } from "react";
import axios from "axios";
import axiosRetry from "axios-retry";

const AxiosContext = createContext();

export const AxiosProvider = ({ children }) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosRetry(api, {
    retries: 3,
    retryCondition: (error) => {
      return error.response?.status >= 500 || error.code === "ECONNABORTED";
    },
    retryDelay: (retryCount) => {
      // Retrasar exponencialmente
      return retryCount * 1000;
    },
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
      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
      return Promise.reject(error);
    }
  );
  return <AxiosContext.Provider value={api}>{children}</AxiosContext.Provider>;
};

export const useAxios = () => {
  return useContext(AxiosContext);
};
