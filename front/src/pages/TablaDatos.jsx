import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
const api = import.meta.env.VITE_API_URL;

const TablaDatos = ({items}) => {
  //const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

/*      try {
        const offset = (page - 1) * limit;

        const response = await fetch(
          `${api}/paquetes?limit=${limit}&offset=${offset}`
        );

        if (!response.ok) {
          throw new Error("Error en la solicitud a API");
        }
        const data = await response.json();

        setItems((prevItems) => [...prevItems, ...data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
*/ 
    };
    fetchData();
  }, [page]);

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
      {" "}
      {}
      <div className="card">
        {" "}
        {}
        <div className="card-body">
          <h1 className="card-title mb-4">Tabla de Datos</h1>
          {loading && <p>Cargando...</p>}
          <table className="table table-striped" {...getTableProps()}>
            {" "}
            {}
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