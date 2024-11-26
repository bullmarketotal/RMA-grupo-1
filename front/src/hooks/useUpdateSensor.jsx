import { useState } from "react";
const api = import.meta.env.VITE_API_URL;

const useUpdateSensor = (sensorId, sensorData) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateSensor = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("desde updatesensor: ", sensorId)
      const response = await fetch(`${api}/nodos/${sensorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sensorData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el sensor");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateSensor, loading, error };
};

export default useUpdateSensor;
