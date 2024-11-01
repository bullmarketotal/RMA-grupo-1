import React from "react";
import { useTable } from "react-table";

const TablaDatos = ({ items }) => {
  // useMemo Evita renderizados innecesarios
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
        {headerGroups.map((headerGroup) => {
          const { key, ...headerGroupProps } =
            headerGroup.getHeaderGroupProps();
          return (
            <tr key={key} {...headerGroupProps}>
              {headerGroup.headers.map((column) => {
                const { key, ...columnProps } = column.getHeaderProps();
                return (
                  <th key={key} {...columnProps}>
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...rowProps } = row.getRowProps();
          return (
            <tr key={key} {...rowProps}>
              {row.cells.map((cell) => {
                const { key, ...cellProps } = cell.getCellProps();
                return (
                  <td key={key} {...cellProps}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TablaDatos;
