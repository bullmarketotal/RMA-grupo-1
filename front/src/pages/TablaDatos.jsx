// Asegúrate de que importes `useState` y `useEffect`
import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
const api = import.meta.env.VITE_API_URL;

const TablaDatos = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Nuevo estado para el sensor ID y la fecha
  const [sensorId, setSensorId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const offset = (page - 1) * limit;

        // Construcción de la URL ahora con los filtros
        let url = `${api}/paquetes?limit=${limit}&offset=${offset}`;
        
        // Añadir los filtros a la URL
        if (sensorId) {
          url += `&sensor_id=${sensorId}`;
        }
        if (date) {
          url += `&date=${encodeURIComponent(date)}`; // Enviar solo la fecha
        }

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("Error en la solicitud a API");
        }
        const data = await response.json();
        
        // Establecer los datos
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, sensorId, date]); // Añadir sensorId y date como dependencias

  //dejo comentado esto para ver como solucionarlo
/*
  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
    if (bottom && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);
*/
  const columns = React.useMemo(
    () => [
      { Header: "ID Sensor", accessor: "sensor_id" },
      { Header: "Temperatura", accessor: "temperatura" },
      { Header: "Nivel Hidrométrico", accessor: "nivel_hidrometrico" },
      { Header: "Fecha", accessor: "date" },
    ],
    []
  );

  const data = React.useMemo(() => items, [items]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title mb-4">Tabla de Datos</h1>
          {loading && <p>Cargando...</p>}
          
          {/* Filtros */}
          <div className="mb-3">
            <label className="form-label"><strong>Filtrar por ID Sensor</strong></label>
            <input
              type="int"
              value={sensorId}
              onChange={(e) => setSensorId(e.target.value)}
              className="form-control mt-2"
            />
            
            <label className="form-label mt-3"><strong>Filtrar por Fecha</strong></label>
            <input
              type="date" // Cambiar a tipo date
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-control mt-2"
            />
          </div>

          <table className="table table-striped" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaDatos;
