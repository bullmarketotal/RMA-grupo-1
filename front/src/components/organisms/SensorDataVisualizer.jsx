import React, { useState } from "react";
import { FiltroDatos } from "../molecules";
import { GraphView, TableView } from "../organisms";
import { Card } from "../atoms";

const SensorDataVisualizer = ({ data, loading, onFilterChange }) => {
  const [view, setView] = useState("graph");
  const handleViewChange = (event) => {
    setView(event.target.id);
  };

  return (
    <Card>
      <div className="d-flex justify-content-start">
        <div
          className="btn-group mb-4 me-3"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="graph"
            autoComplete="off"
            checked={view === "graph"}
            onChange={handleViewChange}
          />
          <label className="btn btn-outline-primary w-100" htmlFor="graph">
            Gráfico
          </label>
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="table"
            autoComplete="off"
            checked={view === "table"}
            onChange={handleViewChange}
          />
          <label className="btn btn-outline-primary w-100" htmlFor="table">
            Tabla
          </label>
        </div>
        <FiltroDatos onFilterChange={onFilterChange} />
      </div>

      {view === "graph" ? (
        <GraphView data={data.paquetes} loading={loading} />
      ) : (
        <TableView data={data} loading={loading} />
      )}
    </Card>
  );
};

export default SensorDataVisualizer;
