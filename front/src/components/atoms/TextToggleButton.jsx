import React from "react";

const TextToggleButton = ({ currentView, onViewChange }) => {
  return (
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
        defaultChecked={currentView === "graph"}
        onChange={onViewChange}
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
        defaultChecked={currentView === "table"}
        onChange={onViewChange}
      />
      <label className="btn btn-outline-primary w-100" htmlFor="table">
        Tabla
      </label>
    </div>
  );
};

export default TextToggleButton;
