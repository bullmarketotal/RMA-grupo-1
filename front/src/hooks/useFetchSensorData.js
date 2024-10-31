import { useEffect, useState } from "react";

const api = import.meta.env.VITE_API_URL;

const useFetchSensorData = (id, startDate, endDate) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const responseJson = {};
  

  useEffect(() => {
    
    const fetchSensor = async () => {
      //console.log("ENTRE A LA FUNCION");
      setLoading(true);
      try {
        let url = `${api}/sensor/${id}`;
        const res = await fetch(url);
        const result = await res.json();
       // console.log("RESULT",result); 
        responseJson.sensor = result;
        
      } catch (err) {
        console.error("Error al obtener la información del nodo: " + err);
        setError("No se pudo cargar la información del sensor.");
      } finally {
        setLoading(false);
      }
    };
    const fetchData = async () => {
      try {
        let url = `${api}/paquetes?sensor_id=${responseJson.sensor.id}`;
        if (startDate) {
          url += `&start_date=${encodeURIComponent(startDate)}`;
        }
        if (endDate) {
          url += `&end_date=${encodeURIComponent(endDate)}`;
        } 
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error en la solicitud a API");
        }
        const data = await response.json();
        console.log("DATA DE PAK",data);
        responseJson.data = data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }  
    };
     fetchSensor();
    
      fetchData();
    
    //setData(responseJson);
    
  }, [id, startDate, endDate]);
 // console.log("fetch: ", data);
 //console.log("lo q venimo a bucal", responseJson);
  console.log("jeison",responseJson);
  return { data:responseJson, loading, error };
};

export default useFetchSensorData;
