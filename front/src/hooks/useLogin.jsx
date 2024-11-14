import React, { useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: contextLogin } = useContext(AuthContext);
  const login = async (username, password) => {
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      const res = await api.post("/login_token", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status !== 200) {
        throw new Error("Error al iniciar sesión");
      }

      const data = res.data;

      // Guardar tokens
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      contextLogin(data.access_token);

      navigate("/dashboard");

      return data.access_token;
    } catch (err) {
      const errorDetail = err.response?.data?.detail;
      setError(
        typeof errorDetail === "string"
          ? errorDetail
          : "Error al iniciar sesión"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
};

export default useLogin;
