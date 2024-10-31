import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
const api = import.meta.env.VITE_API_URL;

//TO-DO: modificar margenes.
const TablaDatos = ({items}) => {
  //const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

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
    { Header: "ID Nodo", accessor: "sensor_id" },
    { Header: "Temperatura", accessor: (row) => `${Math.floor(row.temperatura)}ºC` },
    { Header: "Nivel Hidrométrico", accessor: (row) => row.nivel_hidrometrico.toFixed(2) },
    { Header: "Fecha y Hora", accessor: (row) => {
        const date = new Date(row.date);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}hs`; // Formato dd/mm/aaaa hh:mm
      }
    }
  ],
  []
  );

  const data = React.useMemo(() => items, [items]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="container mt-0">
      {" "}
      {}
      <div className="card">
        {" "}
        {}
        <div className="card-body">
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
