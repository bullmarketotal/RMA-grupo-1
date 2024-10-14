// Asegúrate de que importes `useState` y `useEffect`
import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
const api = import.meta.env.VITE_API_URL;

import TablaDatos from "../pages/TablaDatos";



export default function ApiFetch(){
    
    const [items, setItems] = useState([]);    
    const [sensorId, setSensorId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const limit = 10;
    
    
    useEffect(() => {
        const fetchData = async () => {
          const offset = limit;
          try {
            
    
            // Construcción de la URL ahora con los filtros
            let url = `${api}/paquetes?limit=${limit}`;
    
            // Añadir los filtros a la URL
            if (sensorId) {
              url += `&sensor_id=${sensorId}`;
            }
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
            
            // Establecer los datos
            setItems(data);
            console.log(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }, [sensorId, startDate, endDate]); // Añadir sensorId y date como dependencias

    return(
        <div className="container mt-5">
                <div className="mb-3">
                <label className="form-label"><strong>Filtrar por ID Sensor</strong></label>
                <input
                  type="int"
                  value={sensorId}
                  onChange={(e) => setSensorId(e.target.value)}
                  className="form-control mt-2"
                />
                
                <label className="form-label mt-3"><strong>Desde</strong></label>
                <input
                  type="date" // Cambiar a tipo date
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="form-control mt-2"
                />
    
                <label className="form-label mt-3"><strong>Hasta</strong></label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="form-control mt-2"
                  />
              </div>
              <TablaDatos items={items}/>
        </div>



    );
}