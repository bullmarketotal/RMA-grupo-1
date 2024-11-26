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
  const { accessToken, refreshToken } = useAuth();

  const getToken = () => {
    return accessToken || localStorage.getItem("access_token");
  };
  const getRefreshToken = () => {
    return refreshToken || localStorage.getItem("refresh_token");
  };
  return <AxiosProvider getToken={getToken}>{children}</AxiosProvider>;
};

export default AppProviders;
