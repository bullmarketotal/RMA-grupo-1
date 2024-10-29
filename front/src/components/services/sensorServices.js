const api = import.meta.env.VITE_API_URL;

export const fetchSensorData = async (id) => {
  const response = await fetch(`${api}/sensordata/${id}`);
  if (!response.ok) {
    throw new Error("Error al obtener los datos del sensor por ID");
  }
  const res = await response.json();
  return res.json();
};

export const fetchFilteredData = async (sensorId, startDate, endDate) => {
  let url = `${api}/paquetes?sensor_id=${sensorId}`;
  if (startDate) url += `&start_date=${startDate}`;
  if (endDate) url += `&end_date=${endDate}`;
  const res = await fetch(url);
  if (!response.ok) {
    throw new Error("Error al obtener datos Filtrados");
  }
  return res.json();
};
