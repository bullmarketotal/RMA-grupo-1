import React, { createContext, useState, useEffect, useContext } from "react";
import { createAxiosInstance } from "../services/axiosService";
import { loginUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh_token")
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [permisos, setPermisos] = useState([]);

  const axiosInstance = createAxiosInstance(() => accessToken);

  const transformPermisos = (permisosList) => {
    return permisosList.reduce((acc, permiso) => {
      acc[permiso] = true;
      return acc;
    }, {});
  };

  const login = (newAccessToken, newRefreshToken, newPermisos) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setPermisos(newPermisos);
    localStorage.setItem("access_token", newAccessToken);
    localStorage.setItem("refresh_token", newRefreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setPermisos([]);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
  };

  const verifyAccessToken = async () => {
    if (!accessToken) {
      setIsAuthenticated(false);
      return false;
    }

    try {
      const response = await axiosInstance.get("/verify_token");
      setIsAuthenticated(true);
      setUsername(response.data.user);
      return true;
    } catch (err) {
      console.error("Access token no válido:", err);
      setIsAuthenticated(false);
      logout();
      return false;
    }
  };

  const refreshAccessToken = async () => {
    if (!refreshToken) {
      setIsAuthenticated(false);
      return false;
    }
    try {
      const response = await axiosInstance.post("/refresh_token", {
        refresh_token: refreshToken,
      });
      const { access_token: newAccessToken, refresh_token: newRefreshToken } =
        response.data;

      localStorage.setItem("access_token", newAccessToken);
      localStorage.setItem("refresh_token", newRefreshToken);
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      setIsAuthenticated(true);

      return true;
    } catch (err) {
      console.error("Error al refrescar el token:", err);
      logout();
      return false;
    }
  };

  const verifyOrRefreshToken = async () => {
    const isAccessTokenValid = await verifyAccessToken();
    if (!isAccessTokenValid) {
      await refreshAccessToken();
    }
  };

  const loginUserWrapper = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(username, password, () => accessToken);
      const { access_token, refresh_token, permisos } = response;
      console.log(response);
      setUsername(response.user);
      const permisosDict = transformPermisos(permisos);
      login(access_token, refresh_token, permisosDict);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyOrRefreshToken().then(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        username,
        permisos,
        loading,
        error,
        loginUserWrapper,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
