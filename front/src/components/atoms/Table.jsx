import React from "react";
import { useTable } from "react-table";

const Table = ({ columns, data, onRowClick }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table className={"table-container"} {...getTableProps()}>
      <thead className={"table-definir"}>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                key={column.id}
                {...column.getHeaderProps()}
                className={"table-header"}
              >
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
              key={row.id}
              {...row.getRowProps()}
              onClick={() => onRowClick && onRowClick(row)}
              className="table-row"
            >
              {row.cells.map((cell) => (
                <td
                  key={cell.id}
                  {...cell.getCellProps()}
                  className={"table-row-cell"}
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

export default Table;
