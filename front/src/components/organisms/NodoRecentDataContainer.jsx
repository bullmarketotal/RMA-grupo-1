import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { dateFormatter } from "../utils/utils-graphs";
import { MaxLevelCard } from "../molecules";
import { obtenerTimeAgoString } from "../utils/date";

const TIMEFRAME_24H = 1000 * 60 * 60 * 24;
const TIMEFRAME_7D = 1000 * 60 * 60 * 24 * 7;

function NodoRecentDataContainer({ data, CARD_HEIGHT }) {
  const CARD_WIDTH = "30%";
  const MAIN_CARD_WIDTH = "350px";
  if (!data || data.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }
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
        timeFrame={TIMEFRAME_7D}
      />

      <MaxLevelCard
        data={data}
        CARD_WIDTH={CARD_WIDTH}
        timeFrame={TIMEFRAME_24H}
      />
    </div>
  );
}

export default NodoRecentDataContainer;
