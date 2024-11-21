import React from "react";
import { useTable } from "react-table";
import { Card } from "../atoms";
import { dateFormatter } from "../utils/utils-graphs";

const TablaDatos = ({ items }) => {
  const data = React.useMemo(() => items, [items]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Nodo", // Cambiado a "Nombre Nodo"
        accessor: "nodo_id", // Ahora el acceso es a "nodo" que contiene el nombre
      },
      {
        Header: "Tipo de Dato", // Cambiado a "Tipo de Dato"
        accessor: "type.nombre", // Aquí accedemos al nombre del tipo de dato
      },
      {
        Header: "Dato", // Columna para el dato
        accessor: "data", // Accedemos directamente a `data` que es el valor a mostrar
        Cell: ({ value }) => value.toFixed(1), // Aseguramos que se muestre un solo decimal
      },
      {
        Header: "Fecha y Hora",
        accessor: "date",
        Cell: ({ value }) => {
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const copiarFila = (row) => {
    const texto = row.cells.map((cell) => cell.value).join(" | ");
    navigator.clipboard.writeText(texto).then(() => {
      console.log("copiado");
    });
  };

  return (
    <Card>
      <table
        className="table-container"
        style={{ tableLayout: "fixed", width: "100%" }} // Eliminar márgenes
        {...getTableProps()}
      >
        <thead className="table-definir">
          {headerGroups.map((headerGroup) => {
            const { key, ...headerGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...headerGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...columnProps } = column.getHeaderProps();
                  return (
                    <th key={key} {...columnProps} className="table-header">
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody className="separador-header" {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...rowProps } = row.getRowProps();
            return (
              <tr
                key={key}
                {...rowProps}
                onClick={() => copiarFila(row)}
                className="table-row"
              >
                {row.cells.map((cell) => {
                  const { key, ...cellProps } = cell.getCellProps();
                  return (
                    <td key={key} {...cellProps} className="table-row-cell">
                      {cell.column.Header === "ID Nodo" && cell.render("Cell")}
                      {cell.column.Header === "Tipo de Dato" && cell.render("Cell")}
                      {cell.column.Header === "Dato" && `${Number(cell.value).toFixed(1)} °C`} {/* Agregamos unidad en Dato */}
                      { cell.column.Header === 'Fecha y Hora' && dateFormatter(cell.value) }
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default TablaDatos;
