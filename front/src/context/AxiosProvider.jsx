import React, { createContext, useContext } from "react";
import { createAxiosInstance } from "../services/axiosService";

const AxiosContext = createContext();

export const AxiosProvider = ({ children, getToken, refreshAccessToken }) => {
  const axiosInstance = createAxiosInstance(getToken, refreshAccessToken);

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = () => {
  return useContext(AxiosContext);
};
