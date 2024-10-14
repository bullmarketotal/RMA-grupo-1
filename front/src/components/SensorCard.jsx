import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/font-awesome/css/font-awesome.min.css";
import GraphTemp from "./GraphTemp";
import GraphNivel from "./GraphNivel";
import { randomDataForDoubleChart } from "../utils-graphs";

const SensorCard = ({ sensor }) => {
  const data = randomDataForDoubleChart(50); // Reemplazar por busqueda real de datos

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
                {Math.round(data[data.length - 1].nivel * 10) / 10}m
              </span>
              <br />
              <span className="fs-5">
                <i className="fa fa-thermometer" aria-hidden="true"></i>{" "}
                {Math.round(data[data.length - 1].temp * 10) / 10}ºC
              </span>
              <br />
              <span className="fw-lighter">hace 12 minutos</span>
            </p>
          </div>
          <div className="col-md-4">
            <GraphTemp data={data}></GraphTemp>
          </div>

          <div className="col-md-4">
            <GraphNivel data={data} noBrush={true}></GraphNivel>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="col-md-3">
            <a href={"/sensor/" + sensor.id} className="btn btn-primary me-1">
              Ver datos
            </a>
            <a href="#" className="btn btn-primary">
              Editar
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
