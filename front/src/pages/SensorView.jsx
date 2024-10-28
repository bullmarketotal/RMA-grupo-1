import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/font-awesome/css/font-awesome.min.css";
import GraphDoble from "../components/GraphDoble";
import { randomDataForDoubleChart } from "../utils-graphs";

import ApiFetch from "./ApiFetch";

const api = import.meta.env.VITE_API_URL;

const CARD_HEIGHT = 200;

const SensorView = () => {
  const { id } = useParams();

  const [items, setItems] = useState([]);
  const [sensor, setSensor] = useState({
    id,
    identificador: "RMA-1",
    latitud: -43.2466030899736,
    longitud: -65.4921152059314,
  });
  const [view, setView] = useState("graph");

  const handleViewChange = (event) => {
    setView(event.target.id);
  };

  return (
    <div className="container mt-5">
      <div id="main">
        <div id="header" className="d-flex justify-content-between pb-4">
          <div id="info-sensor">
            <h2>
              <i className="fa fa-rss" aria-hidden="true" />{" "}
              {sensor.identificador}
            </h2>
            <span>
              <i className="fa fa-map-marker me-2" aria-hidden="true" />{" "}
              {sensor.latitud}, {sensor.longitud}
            </span>
          </div>
          <button
            id="btn-modificar"
            className="btn btn-secondary align-self-start"
          >
            Modificar Nodo
          </button>
        </div>
        <div
          id="content"
          className="d-flex justify-content-between align-items-start"
        >
          <div
            id="card-container"
            className="d-flex align-items-center"
            style={{ height: CARD_HEIGHT }}
          >
            <div className="card me-5 p-3">
              <div className="card-body align-items-center">
                <p className="card-text fs-3 d-flex">
                  <div className="me-4">
                    <i className="fa fa-tint me-2" aria-hidden="true" />
                    1.3m
                  </div>
                  <div>
                    <i className="fa fa-thermometer me-2" aria-hidden="true" />
                    12.4ºC
                  </div>
                </p>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Hace 12 minutos
                </h6>
              </div>
            </div>
            <div className="card me-2 p-1">
              <div className="card-header">
                <h6 className="card-title text-center">Máximo 24hs</h6>
              </div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <p className="card-text fs-5">
                  <div>
                    <i className="fa fa-tint me-2" aria-hidden="true" />
                    3.3m
                  </div>
                </p>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  13:02
                </h6>
              </div>
            </div>
            <div className="card me-2 p-1">
              <div className="card-header">
                <h6 className="card-title text-center">Máximo 7 días</h6>
              </div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <p className="card-text fs-5">
                  <div>
                    <i className="fa fa-tint me-2" aria-hidden="true" />
                    4.2m
                  </div>
                </p>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  04/10/2024 09:39
                </h6>
              </div>
            </div>
            <div className="card p-1">
              <div className="card-header  text-center">
                <h6>Máximo mensual</h6>
              </div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <p className="card-text fs-5">
                  <div>
                    <i className="fa fa-tint me-2" aria-hidden="true" />
                    5.0m
                  </div>
                </p>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  04/10/2024 09:39
                </h6>
              </div>
            </div>
          </div>
          <div
            id="mapa"
            className="d-none d-lg-block"
            style={{
              height: CARD_HEIGHT + "px",
              width: "350px",
              backgroundColor: "lightblue",
            }}
          ></div>
        </div>
        <hr />
      </div>
      <div id="data-visualizer">
        <div
          className="btn-group mb-4"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="graph"
            autocomplete="off"
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
            autocomplete="off"
            onChange={handleViewChange}
          />
          <label className="btn btn-outline-primary" htmlFor="table">
            Tabla
          </label>
        </div>
        {view === "graph" ? (
          <GraphDoble data={randomDataForDoubleChart()} />
        ) : (
          <ApiFetch initialSensorId={id} setData={setItems} />
        )}{" "}
        {/* el componente ApiFetch recibe un id para podes buscarlo diractamente sus datos y que la lista los muestre */}
      </div>
    </div>
  );
};

export default SensorView;
