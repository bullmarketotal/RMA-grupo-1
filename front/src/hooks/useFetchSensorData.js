import { useEffect, useState } from "react";

const api = import.meta.env.VITE_API_URL;

const useFetchSensorData = (id, startDate, endDate) => {
  const [data, setData] = useState({ sensor: null, paquetes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      setLoading(true);
      try {
        const sensorUrl = `${api}/sensor/${id}`;
        const sensorRes = await fetch(sensorUrl);
        if (!sensorRes.ok) {
          throw new Error("Error al obtener la información del sensor");
        }
        const sensorResult = await sensorRes.json();

        let paquetesUrl = `${api}/paquetes?sensor_id=${sensorResult.id}`;
        if (startDate)
          paquetesUrl += `&start_date=${encodeURIComponent(startDate)}`;
        if (endDate) paquetesUrl += `&end_date=${encodeURIComponent(endDate)}`;

        const paquetesRes = await fetch(paquetesUrl);
        if (!paquetesRes.ok) {
          throw new Error("Error al obtener los datos de paquetes");
        }
        const paquetesResult = await paquetesRes.json();

        setData({ sensor: sensorResult, paquetes: paquetesResult });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("No se pudo cargar la información del sensor o los paquetes.");
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
  }, [id, startDate, endDate]);
  console.log("hola", data);
  return { data, loading, error };
};

export default useFetchSensorData;
