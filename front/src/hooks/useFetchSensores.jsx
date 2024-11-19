import { useState, useEffect } from "react";

const api = import.meta.env.VITE_API_URL;

function useFetchSensores() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${api}/nodos`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError("Error al hacer fetch a la lista de sensores: " + error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
  };
}

export default useFetchSensores;
