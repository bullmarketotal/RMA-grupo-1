import React, { useState } from "react";
import FiltrosFetch from "../components/FiltrosFetch";
import GraphView from "../components/GraphView";
import TableView from "../components/TableView";

const SensorDataVisualizer = ({ data, loading }) => {
  const [view, setView] = useState("graph");
  const handleViewChange = (event) => {
    setView(event.target.id);
  };

  return (
    <div id="data-visualizer" className="card mb-4 shadow">
      <div className="card-body">
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
          <FiltrosFetch initialSensorId={data.id}  />
        </div>

        {view === "graph" ? (
          <GraphView data={data.data} loading={loading} />
        ) : (
          <TableView data={data} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default SensorDataVisualizer;
