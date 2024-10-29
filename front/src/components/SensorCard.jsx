import "bootstrap/dist/css/bootstrap.min.css";
import React, { useDebugValue, useEffect, useState } from "react";
import "../assets/font-awesome/css/font-awesome.min.css";
import { randomDataForDoubleChart } from "../utils-graphs";
import GraphNivel from "./GraphNivel";
import GraphTemp from "./GraphTemp";
import LoadingSpinner from './LoadingSpinner'

const SensorCard = ({ sensor }) => {

  const [data, setData] = useState([]);
  const [loadingGraphs, setLoadingGraphs] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL;
  const dateOf24hoursBefore = new Date(Date.now() - 1000 * 60 * 60 * 24);

  const stringOfDateOf24hoursBefore = dateOf24hoursBefore.toISOString()

  useEffect(() => {
    fetch(`${API_URL}/paquetes?start_date=${stringOfDateOf24hoursBefore}&end_date=${(new Date()).toISOString()}&sensor_id=${sensor.id}&limit=200`)
      .then(res => res.json())
      .then(res => {
        setData(res)
        setLoadingGraphs(false)
      })

  }, [])


  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex">
          <div className="col-md-4">
            <h4 className="card-title">
              <i className="fa fa-rss" aria-hidden="true"></i>{" "}
              {sensor.identificador}
            </h4>
            <p className="card-text">
              <i className="fa fa-map-marker me-2" aria-hidden="true"></i>
              {sensor.latitud}, {sensor.longitud}
            </p>
            <p className="card-text">
              <span className="fw-bold">Último dato:</span>
              <br />
              <span className="fs-5">
                <i className="fa fa-tint" aria-hidden="true"></i>{" "}
                {Math.round(data[data.length - 1]?.nivel_hidrometrico * 10) / 10}
              </span>
              <br />
              <span className="fs-5">
                <i className="fa fa-thermometer" aria-hidden="true"></i>{" "}
                {Math.round(data[data.length - 1]?.temperatura * 10) / 10}ºC
              </span>
              <br />
              <span className="fw-lighter">hace 12 minutos</span>
            </p>
          </div>
          {!loadingGraphs ?
            <>
              <div className="col-md-4">
                <GraphTemp data={data} syncId={sensor.id}></GraphTemp>
              </div>
              <div className="col-md-4">
                <GraphNivel data={data} noBrush={true} syncId={sensor.id}></GraphNivel>
              </div>
            </>
            :
            <div className="col-md-8 d-flex justify-content-center">
              <LoadingSpinner/>
            </div>
          }

        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="col-md-3">
            <a href={"/sensor/" + sensor.id} className="btn btn-primary me-1">
              Ver datos
            </a>
          </div>
          <div className="col-md-9 d-flex col-md-9">
            <i
              className="fa fa-battery-three-quarters align-middle me-2"
              aria-hidden="true"
            ></i>
            <div
              className="progress ms-1 col-md-11"
              role="progressbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ border: "1px black solid" }}
            >
              <div
                className="progress-bar"
                style={{ width: `${sensor.porcentajeBateria}%` }}
              >
                <span>{sensor.porcentajeBateria}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;
