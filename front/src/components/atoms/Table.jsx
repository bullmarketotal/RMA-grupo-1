import React from "react";
import { useTable } from "react-table";

const Table = ({ columns, data, onRowClick }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table className={"table-container"} {...getTableProps()}>
      <thead className={"table-definir"}>
        {headerGroups.map((headerGroup) => {
          const { key, ...headerGroupProps } =
            headerGroup.getHeaderGroupProps();
          return (
            <tr key={key} {...headerGroupProps}>
              {headerGroup.headers.map((column) => {
                const { key, ...columnProps } = column.getHeaderProps();
                return (
                  <th key={key} {...columnProps} className={"table-header"}>
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
            <tr
              key={key}
              {...rowProps}
              onClick={() => onRowClick && onRowClick(row)}
              className="table-row"
            >
              {row.cells.map((cell) => {
                const { key, ...cellProps } = cell.getCellProps();
                return (
                  <td key={key} {...cellProps} className="table-row-cell">
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

export default Table;
