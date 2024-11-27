import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Error403 from "./Error403";

const ProtectedRoute = ({ children, permission }) => {
  const { isAuthenticated, permisos } = useAuth();
  const accessToken = localStorage.getItem("access_token");

  if (!isAuthenticated || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (permission && !permisos[permission]) {
    return <Error403 />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
