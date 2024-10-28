import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Filtro from "../components/Filtro";
import TablaDatos from "../components/TablaDatos";
import Paginacion from "../components/Paginacion";
import LoadingSpinner from "../components/LoadingSpinner";

const api = import.meta.env.VITE_API_URL;

const ApiFetch = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sensorId, setSensorId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMessage(""); // Reinicia el mensaje de error
      try {
        const offset = (page - 1) * limit;
        let url = `${api}/paquetes?limit=${limit}&offset=${offset}`;

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
          throw new Error("Error en la solicitud a la API");
        }
        const data = await response.json();
        setItems(data);
        setTotalPages(Math.ceil(data.length / limit));
      } catch (error) {
        setErrorMessage("Error al cargar los datos.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, sensorId, startDate, endDate]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleFilterReset = () => {
    setSensorId("");
    setStartDate("");
    setEndDate("");
    setPage(1); // Restablece a la primera página luego de un filtro
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title mb-4">Tabla de Datos</h1>

          {/* Mensaje de error */}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          {/* Filtros */}
          <Filtro
            sensorId={sensorId}
            setSensorId={setSensorId}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            handleFilterReset={handleFilterReset}
          />

          {/* Tabla de datos */}

          {loading && <LoadingSpinner />}
          <TablaDatos items={items} />

          {/* Paginación */}
          <Paginacion
            page={page}
            totalPages={totalPages}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ApiFetch;
