import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/font-awesome/css/font-awesome.min.css";
import GraphDoble from "../components/GraphDoble";
import { randomDataForDoubleChart } from "../utils-graphs";
import NodoRecentDataContainer from "../components/NodoRecentDataContainer";

import FiltrosFetch from "./FiltrosFetch";
import TablaDatos from "../components/TablaDatos";


const api = import.meta.env.VITE_API_URL;

const CARD_HEIGHT = 200;

const SensorView = () => {
  const { id } = useParams();
  const [nodo, setNodo] = useState({
    sensor: {
      id,
      identificador: null,
      latitud: null,
      longitud: null,
    }
  });
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("graph");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/sensordata/${id}`)
      .then((res) => res.json())
      .then((info) => {
        setNodo({
          sensor: {
            id,
            identificador: info.sensor.identificador,
            latitud: info.sensor.latitud,
            longitud: info.sensor.longitud,
          }
        });
        setData(info.data);
        setLoading(false);
      })
      .catch((err) =>
        console.error(
          "Se produjo un error al obtener la información del nodo: " + err
        )
      );
  }, []);



  const handleViewChange = (event) => {
    setView(event.target.id);
  };

  return (
    <div className="container mt-5">
      <div id="main">
        <div id="header" className="d-flex justify-content-between pb-1">
          <div id="info-sensor">
            <h2 className="d-flex align-items-center">
              <i className="fa fa-rss me-2" aria-hidden="true" />
              {loading ? (
                <p className="placeholder-glow">
                  <span className="placeholder col-12">RMA-ejemplo</span>
                </p>
              ) : (
                nodo.sensor.identificador
              )}
            </h2>
            <p>Una breve descripción del nodo irá incluida acá una vez que se implemente este campo en la base de datos.</p>
            <span>
              <i className="fa fa-map-marker me-2" aria-hidden="true" />{" "}
              <span>
                {loading ? null : (
                  <>
                    <b>Latitud:</b> {nodo.sensor.latitud.toFixed(5)}
                    <b> Longitud:</b> {nodo.sensor.longitud.toFixed(5)}
                  </>
                )}
              </span>
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
          {loading || !data?.length ? null : (
            <NodoRecentDataContainer
              data={data}
              CARD_HEIGHT={CARD_HEIGHT}
            ></NodoRecentDataContainer>
          )}

          <div
            id="mapa"
            className="d-none d-xl-block"
            style={{
              height: CARD_HEIGHT + "px",
              width: "320px",
              backgroundColor: "lightblue",
            }}
          ></div>
        </div>
        <hr />
      </div>
      <div id="data-visualizer">
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
          <FiltrosFetch initialSensorId={id} setData={setData}/>
        </div>
        {view === "graph" ? (
          <GraphDoble data={data} />
        ) : (
            <TablaDatos items={data}/>
        )}{" "}
        {/* FiltrosFetch recibe el setData del componente que lo invoque y devuelve el arreglo con los paquetes. */}
      </div>
    </div>
  );
};

export default SensorView;
