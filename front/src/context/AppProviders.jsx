import React from "react";
import { AuthProvider, useAuth } from "./AuthProvider";
import { AxiosProvider } from "./AxiosProvider";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <AuthWrapper>{children}</AuthWrapper>
    </AuthProvider>
  );
};

const AuthWrapper = ({ children }) => {
  const { accessToken, refreshAccessToken } = useAuth();

  const getToken = () => {
    return accessToken || localStorage.getItem("access_token");
  };

  return (
    <AxiosProvider refreshAccessToken={refreshAccessToken} getToken={getToken}>
      {children}
    </AxiosProvider>
  );
};

export default AppProviders;
