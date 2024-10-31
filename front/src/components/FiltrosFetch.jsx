import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

const api = import.meta.env.VITE_API_URL;

export default function FiltrosFetch({ onFilterChange }) {
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
      .toISOString()
      .substring(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substring(0, 10)
  );

  //aqui ocurre la magia
  const applyFilter = () => {
    onFilterChange(startDate, endDate);
  };

  return (
    <div className="container mt-1">
      <div className="mb-3 d-flex align-items-center">
        <label className="form-label me-2 mb-0">
          <strong>ID Sensor</strong>
          <strong>Desde</strong>
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-control form-control-sm d-inline-block me-3"
          style={{ width: "130px" }}
        />

        <label className="form-label me-2 mb-0">
          <strong>Hasta</strong>
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-control form-control-sm d-inline-block"
          style={{ width: "130px" }}
        />

        <button className="btn btn-primary btn-sm ms-3" onClick={applyFilter}>
          Aplicar Filtro
        </button>
      </div>
    </div>
  );
}
