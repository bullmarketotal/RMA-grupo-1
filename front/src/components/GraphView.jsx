import React from "react";
import PropTypes from "prop-types";
import GraphNivel from "./GraphNivel";
import GraphTemp from "./GraphTemp";
import LoadingSpinner from "./LoadingSpinner";

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
      <GraphNivel data={data} syncId={0} />
      <h4>Temperatura</h4>
      <GraphTemp data={data} syncId={0} />
    </div>
  );
};

// Definición de PropTypes
GraphView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.number.isRequired, // Debe ser un número (ticks de fecha)
      nivel_hidrometrico: PropTypes.number.isRequired, // Debe ser un número (nivel hidrométrico)
      temperatura: PropTypes.number.isRequired, // Debe ser un número (temperatura)
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired, // loading es un booleano y es requerido
};

export default GraphView;
