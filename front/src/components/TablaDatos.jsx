import React, { useEffect, useState } from "react";
import { useTable } from "react-table";

const TablaDatos = ({ items }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLoading(false);
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
      {
        Header: "Fecha y Hora",
        accessor: "date",
        Cell: ({ value }) => {
          // Convertir el timestamp
          const date = new Date(value);
          return date.toLocaleString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
        },
      },
    ],
    []
  );

  const data = React.useMemo(() => items, [items]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table className="table table-striped" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id}>
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
            <tr
              {...row.getRowProps()}
              key={`${row.original.sensor_id}-${row.original.date}`}
            >
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  key={`${row.id}-${cell.column.id}`}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TablaDatos;
