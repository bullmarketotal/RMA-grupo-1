import { useEffect, useState } from "react";
import { convertFieldToTimestamp } from "../components/utils/date";
import api from "../api/axios";

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
        const sensorUrl = `/sensor/${id}`;
        const sensorRes = await api.get(sensorUrl);

        const sensorResult = sensorRes.data;

        let paquetesUrl = `/paquetes?sensor_id=${sensorResult.id}`;
        if (startDate)
          paquetesUrl += `&start_date=${encodeURIComponent(startDate)}`;
        if (endDate) paquetesUrl += `&end_date=${encodeURIComponent(endDate)}`;

        const paquetesRes = await api.get(paquetesUrl);
        const paquetesResult = paquetesRes.data;

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
  }, [id, startDate, endDate]); // Cada vez que cambien los valores de id, startDate o endDate se ejecuta el useEffect.

  return {
    data,
    loading,
    error,
  };
};

export default useFetchSensorData;
