import { dateFormatter } from "../utils-graphs";
import MaxLevelCard from "./MaxLevelCard";
import Max24hsCard from "./Max24hsCard";
import Max7dCard from "./Max7dCard";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
const TIMEFRAME_24H = 1000 * 60 * 60 * 24;
const TIMEFRAME_7D = 1000 * 60 * 60 * 24 * 7;

const obtenerTimeAgoString = (lastData) => {
  const lastTime = new Date(lastData.date);
  const now = new Date();
  const minutesBetween = (now - lastTime) / (1000 * 60);

  if (minutesBetween < 1) return `Hace menos de un minuto`;
  if (minutesBetween < 2) return `Hace un minuto`;
  if (minutesBetween < 59) return `Hace ${minutesBetween.toFixed(0)} minutos`;
  if (minutesBetween < 120) return `Hace 1 hora`;
  if (minutesBetween < 60 * 24)
    return `Hace ${Math.floor(minutesBetween / 60).toFixed(0)} horas`;

  return `Hace ${Math.floor(minutesBetween / (60 * 24)).toFixed(0)} días`;
};

export default function NodoRecentDataContainer({ data, CARD_HEIGHT }) {
  const CARD_WIDTH = "30%";
  const MAIN_CARD_WIDTH = "350px";

  const lastData = data[data.length - 1]; // Último dato
  const timeAgoString = obtenerTimeAgoString(lastData); // Cadena de tiempo

  return (
    <div
      id="card-container"
      className="d-flex align-items-center"
      style={{ height: CARD_HEIGHT }}
      title={dateFormatter(new Date(lastData.date).getTime())}
    >
      <div className="card me-3" style={{ width: MAIN_CARD_WIDTH }}>
        <div className="card-header">
          <h6 className="card-title text-center mb-1">Últimos Datos</h6>
        </div>
        <div className="card-body d-flex flex-column align-items-center">
          <div className="card-text fs-5 d-flex justify-content-center align-items-center">
            <span className="me-3 d-flex align-items-center">
              <i className="fa fa-tint me-2" aria-hidden="true" />
              {lastData.nivel_hidrometrico.toFixed(2)} m
            </span>
            <span className="d-flex align-items-center">
              <i className="fa fa-thermometer me-2" aria-hidden="true" />
              {lastData.temperatura.toFixed(1)} ºC
            </span>
          </div>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {timeAgoString}
          </h6>
        </div>
      </div>
      <MaxLevelCard
        data={data}
        CARD_WIDTH={CARD_WIDTH}
        timeFrame={TIMEFRAME_24H}
      />
      <MaxLevelCard
        data={data}
        CARD_WIDTH={CARD_WIDTH}
        timeFrame={TIMEFRAME_7D}
      />
    </div>
  );
}
