import React from "react";
import { useTable } from "react-table";

const TablaDatos = ({ items }) => {
  const columns = React.useMemo(
    () => [
      { Header: "ID Sensor", accessor: "identificador" },
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
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
  );
};

export default TablaDatos;
