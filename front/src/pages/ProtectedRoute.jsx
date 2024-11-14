import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const accessToken = localStorage.getItem("access_token");

  return isAuthenticated && accessToken ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
