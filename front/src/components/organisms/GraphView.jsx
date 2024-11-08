import React from "react";
import PropTypes from "prop-types";
import { GraphNivel, GraphTemp } from "../molecules";
import { LoadingSpinner } from "../atoms";

const GraphView = ({ data, loading }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (data.length === 0) {
    return <div>No se pudieron procesar los datos para el gráfico.</div>;
  }

  // Si las fechas no son un número de ticks, se parsea
  if (!Number.isInteger(data[0]?.date)) {
    data.forEach((punto) => {
      punto.date = new Date(punto.date).getTime();
    });
  }

  return (
    <div style={{ width: "100%" }}>
      <h4>Nivel hidrométrico</h4>
      <GraphNivel data={data} />
      <h4>Temperatura</h4>
      <GraphTemp data={data} />
    </div>
  );
};
export default GraphView;
