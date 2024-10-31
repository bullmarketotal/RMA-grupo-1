import { useEffect, useState } from "react";

const api = import.meta.env.VITE_API_URL;

const useFetchSensorData = (id, startDate, endDate) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      setLoading(true);
      try {
        let url = `${api}/sensordata/${id}`;
        if (startDate) {
          url += `?start_date=${encodeURIComponent(startDate)}`;
        }
        if (endDate) {
          url += `&end_date=${encodeURIComponent(endDate)}`;
        }
        const res = await fetch(url);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error al obtener la información del nodo: " + err);
        setError("No se pudo cargar la información del sensor.");
      } finally {
        setLoading(false);
      }
    };
    fetchSensorData();
  }, [id, startDate, endDate]);
  console.log("fetch: ", data);
  return { data, loading, error };
};

export default useFetchSensorData;
