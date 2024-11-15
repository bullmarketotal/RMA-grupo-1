import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const accessToken = localStorage.getItem("access_token");

  return isAuthenticated && accessToken ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
