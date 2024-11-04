import { filterDataByTime, getMaxValue } from "../utils/sensorUtils";

const TIMEFRAME_24H = 1000 * 60 * 60 * 24;
const TIMEFRAME_7D = 1000 * 60 * 60 * 24 * 7;

function MaxLevelCard({ data, CARD_WIDTH, timeFrame }) {
  const filteredData = filterDataByTime(data, timeFrame);
  const maxNivel = getMaxValue(filteredData, "nivel_hidrometrico");

  return (
    <div
      className={`bg-white shadow-sm mx-4 my-2 rounded-lg`}
      style={{ width: CARD_WIDTH }}
    >
      <div className="border-b mb-3 bg-gray-100 rounded-t-lg p-1">
        <h6 className="text-center text-xl font-semibold">
          {" "}
          {/* Aumentar tamaño de fuente */}
          Pico {timeFrame === TIMEFRAME_24H ? "24hs" : "7 días"}
        </h6>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center text-2xl font-medium mb-3">
          {" "}
          {/* Aumentar tamaño de fuente */}
          <i className="fa fa-tint mr-2" aria-hidden="true" />
          {maxNivel.nivel_hidrometrico} m
        </div>
        <h6 className="text-gray-500 text-base text-center overflow-hidden whitespace-nowrap">
          {" "}
          {/* Aumentar tamaño de fuente */}
          {maxNivel.stringTime}
        </h6>
      </div>
    </div>
  );
}

export default MaxLevelCard;
