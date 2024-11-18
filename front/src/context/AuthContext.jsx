import React, { createContext, useState, useEffect, useCallback } from "react";
import { useAxios } from "../context/AxiosProvider";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  const login = (accessToken, refreshToken) => {
    if (accessToken && refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      setToken(accessToken);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setToken(null);
    setIsAuthenticated(false);
  };

  const verifyToken = useCallback(async () => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      try {
        await axios.get("/verify_token", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
