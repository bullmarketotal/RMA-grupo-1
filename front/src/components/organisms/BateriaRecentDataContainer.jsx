import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { dateFormatter } from "../utils/utils-graphs";
import { MaxLevelCard } from "../molecules";
import { obtenerTimeAgoString } from "../utils/date";

const TIMEFRAME_24H = 1000 * 60 * 60 * 24;
const TIMEFRAME_7D = 1000 * 60 * 60 * 24 * 7;

function BateriaRecentDataContainer({ data, CARD_HEIGHT }) {
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
          <h6 className="card-title text-center mb-1">Último Dato</h6>
        </div>
        <div className="card-body d-flex flex-column align-items-center">
          <div className="card-text fs-5 d-flex justify-content-center align-items-center">
            <span className="me-3 d-flex align-items-center">
              <i class="fa fa-bolt m-2" aria-hidden="true"></i>
              {lastData.nivel_hidrometrico.toFixed(2)} v
            </span>
          </div>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {timeAgoString}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default BateriaRecentDataContainer;