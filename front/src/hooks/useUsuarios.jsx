import { useState, useEffect } from "react";
import axios from "../api/axios";

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsuarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/usuarios");
      setUsuarios(response.data);
    } catch (err) {
      setError(err?.response?.data?.detail || "Error al obtener los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return { usuarios, loading, error, fetchUsuarios };
};
