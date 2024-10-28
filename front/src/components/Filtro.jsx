import React from "react";

const Filtro = ({
  sensorId,
  setSensorId,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleFilterReset,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">
        <strong>Filtrar por ID Sensor</strong>
      </label>
      <input
        type="text"
        value={sensorId}
        onChange={(e) => setSensorId(e.target.value)}
        className="form-control mt-2"
        placeholder="Ingrese ID de Sensor"
      />

      <label className="form-label mt-3">
        <strong>Desde</strong>
      </label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="form-control mt-2"
      />

      <label className="form-label mt-3">
        <strong>Hasta</strong>
      </label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="form-control mt-2"
      />

      <button className="btn btn-secondary mt-3" onClick={handleFilterReset}>
        Resetear filtros
      </button>
    </div>
  );
};

export default Filtro;
