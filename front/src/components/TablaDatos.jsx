import React from "react";
import { useTable } from "react-table";

const TablaDatos = ({ items }) => {
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
