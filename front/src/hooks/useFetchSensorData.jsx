import { useEffect, useState } from "react";
import { convertFieldToTimestamp } from "../components/utils/date";

const api = import.meta.env.VITE_API_URL;

const useFetchSensorData = (id, startDate, endDate) => {
  const [data, setData] = useState({
    sensor: null,
    paquetes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      setLoading(true);
      try {
        const sensorUrl = `${api}/sensor/${id}`;
        const sensorRes = await fetch(sensorUrl);
        if (!sensorRes.ok) {
          throw new Error("Error al obtener el sensor");
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
        const formattedPaquetes = convertFieldToTimestamp(
          paquetesResult,
          "date"
        );
        setData({
          sensor: sensorResult,
          paquetes: formattedPaquetes,
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error en la carga de datos");
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
  }, [id, startDate, endDate]); //cada vez que cambien los valores de id, startDate, o endDate se ejecuta el useEffect.

  return {
    data,
    loading,
    error,
  };
};

export default useFetchSensorData;
