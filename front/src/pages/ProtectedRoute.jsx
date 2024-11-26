import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const accessToken = localStorage.getItem("access_token");

  return isAuthenticated && accessToken ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
