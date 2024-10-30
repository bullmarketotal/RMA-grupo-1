import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const SensorHeader = ({ identificador, latitud, longitud, loading }) => (
  <div id="header" className="d-flex justify-content-between pb-1">
    <div id="info-sensor">
      <h2 className="d-flex align-items-center">
        <i className="fa fa-rss me-2" aria-hidden="true" />
        {loading ? <LoadingSpinner /> : identificador}
      </h2>
      <p>Una breve descripción del nodo irá aquí.</p>
      <span>
        <i className="fa fa-map-marker me-2" aria-hidden="true" />{" "}
        <span>
          {loading ? null : (
            <>
              <b>Latitud:</b> {latitud.toFixed(5)} <b> Longitud:</b>{" "}
              {longitud.toFixed(5)}
            </>
          )}
        </span>
      </span>
    </div>
    <button id="btn-modificar" className="btn btn-secondary align-self-start">
      Modificar Nodo
    </button>
  </div>
);

export default SensorHeader;
