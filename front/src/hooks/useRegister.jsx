import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = async (username, password) => {
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/register", { username, password });
      if (res.status !== 200) {
        throw new Error("Error al registrarse");
      }
      navigate("/login");
    } catch (err) {
      const errorDetail = err.response?.data?.detail;
      if (Array.isArray(errorDetail)) {
        setError(errorDetail.map((item) => item.msg).join(", "));
      } else {
        setError(errorDetail || "Error al registrarse");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, register };
};

export default useRegister;
