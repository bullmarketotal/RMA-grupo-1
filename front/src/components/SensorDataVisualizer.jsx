import React from "react";
import FiltrosFetch from "../components/FiltrosFetch";
import GraphDoble from "../components/GraphDoble";
import TablaDatos from "../components/TablaDatos";
import Paginacion from "../components/Paginacion";
import LoadingSpinner from "../components/LoadingSpinner";

const SensorDataVisualizer = ({
  view,
  handleViewChange,
  data,
  setData,
  totalItems,
  loading,
  itemsPerPage,
  currentPage,
  handlePageChange,
  getVisibleData,
  sensorId,
}) => (
  <div id="data-visualizer" className="card mb-4">
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
            defaultChecked
            onChange={handleViewChange}
          />
          <label className="btn btn-outline-primary" htmlFor="graph">
            Gráfico
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="table"
            autoComplete="off"
            onChange={handleViewChange}
          />
          <label className="btn btn-outline-primary" htmlFor="table">
            Tabla
          </label>
        </div>
        <FiltrosFetch
          initialSensorId={sensorId}
          setData={setData}
          totalItems={totalItems}
        />
      </div>
      {view === "graph" ? (
        loading ? (
          <LoadingSpinner />
        ) : (
          <GraphDoble data={data} />
        )
      ) : (
        view === "table" && (
          <div>
            <Paginacion
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            {loading ? (
              <LoadingSpinner />
            ) : (
              <TablaDatos items={getVisibleData()} />
            )}
            <Paginacion
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )
      )}
    </div>
  </div>
);

export default SensorDataVisualizer;
