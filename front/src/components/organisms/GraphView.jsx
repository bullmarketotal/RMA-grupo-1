import React from "react";
import PropTypes from "prop-types";
import { GraphNivel, GraphTemp } from "../molecules";
import { LoadingSpinner } from "../atoms";

const GraphView = ({ dataNivel, dataTemp, loading }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (dataNivel.length === 0) {
    return <div>No se pudieron procesar los datos para el gráfico.</div>;
  }

  // Si las fechas no son un número de ticks, se parsea
  if (!Number.isInteger(dataNivel[0]?.date)) {
    dataNivel.forEach((punto) => {
      punto.date = new Date(punto.date).getTime();
    });
  }
  if (!Number.isInteger(dataTemp[0]?.date)) {
    dataNivel.forEach((punto) => {
      punto.date = new Date(punto.date).getTime();
    });
  }

  return (
    <div style={{ width: "100%" }}>
      <h4 className="roboto-bold text-2xl text-center mt-8 py-3 dark:text-slate-100">
        Nivel Hidrométrico
      </h4>
      <GraphNivel data={dataNivel} />
      <h4 className="roboto-bold text-2xl text-center py-3 dark:text-slate-100">
        Temperatura
      </h4>
      <GraphTemp data={dataTemp} />
    </div>
  );
};
export default GraphView;
