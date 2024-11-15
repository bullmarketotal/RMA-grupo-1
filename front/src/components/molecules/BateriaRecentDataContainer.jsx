import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { dateFormatter } from "../utils/utils-graphs";
import { MaxLevelCard } from ".";
import { obtenerTimeAgoString } from "../utils/date";
import { CardData } from "../atoms";

const TIMEFRAME_24H = 1000 * 60 * 60 * 24;
const TIMEFRAME_7D = 1000 * 60 * 60 * 24 * 7;

function BateriaRecentDataContainer({ data }) {
  if (!data || data.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }
  const lastData = data[data.length - 1]; // Último dato
  const timeAgoString = obtenerTimeAgoString(lastData); // Cadena de tiempo

  return (
    <CardData title={"Último Dato"}>
      <div className="flex flex-col items-center">
        <div className="flex items-center normal-text text-xl font-medium">
          {/* Voltaje*/}
          <span className="flex items-center">
            <i
              className="fa fa-bolt text-yellow-500 mx-2"
              aria-hidden="true"
            ></i>
            {lastData.nivel_hidrometrico.toFixed(2)} V
          </span>
        </div>
        {/* Tiempo desde la ultima medición */}
        <h6 className="text-gray-500 text-base text-center mb-3">
          {timeAgoString}
        </h6>
      </div>
    </CardData>
  );
}

export default BateriaRecentDataContainer;
