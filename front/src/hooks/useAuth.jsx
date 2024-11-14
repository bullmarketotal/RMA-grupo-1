import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/login_token", { username, password });

      if (res.status !== 200) {
        throw new Error("Error al iniciar sesión");
      }
      const data = res.data;
      localStorage.setItem("token", data.access_token);

      navigate("/dashboard");

      return data.access_token;
    } catch (err) {
      setError(err.response?.data?.detail || "Error al iniciar sesión");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, password) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/register", { username, password });

      if (res.status !== 200) {
        throw new Error("Error al registrarse");
      }

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleLogin, handleRegister };
};

export default useAuth;
