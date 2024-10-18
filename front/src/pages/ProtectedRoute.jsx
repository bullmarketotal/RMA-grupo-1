import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderizar
  return children;
};

export default ProtectedRoute;
