import React from "react";
import { Card, Table } from "../atoms";

const TablaNodos = ({ items }) => {
  const data = React.useMemo(() => items, [items]);
  const columns = React.useMemo(
    () => [
      {
        Header: "ID Sensor",
        accessor: "identificador",
      },
      {
        Header: "Temperatura",
        accessor: "temperatura",
      },
      {
        Header: "Nivel Hidrométrico",
        accessor: "nivel_hidrometrico",
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

  const copiarFila = (row) => {
    const texto = row.cells.map((cell) => cell.value).join(" | ");
    navigator.clipboard.writeText(texto).then(() => {
      console.log("copiado");
    });
  };

  return (
    <Card>
      <Table data={data} columns={columns} onRowClick={copiarFila} />
    </Card>
  );
};

export default TablaNodos;
