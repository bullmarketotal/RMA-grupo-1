import { FaTint } from "react-icons/fa";
import { CardData } from "../atoms";
import { filterDataByTime, getMaxValue } from "../utils/sensorUtils";

const TIMEFRAME_24H = 1000 * 60 * 60 * 24;
const TIMEFRAME_7D = 1000 * 60 * 60 * 24 * 7;

function MaxLevelCard({ data, timeFrame }) {
  const filteredData = filterDataByTime(data, timeFrame);
  const maxNivel = getMaxValue(filteredData, "nivel_hidrometrico");

  return (
    <CardData title={`Pico ${timeFrame === TIMEFRAME_24H ? "24hs" : "7 días"}`}>
      <div className="flex flex-col items-center">
        {/* Datos de nivel hidormetrico */}
        <div className="flex normal-text items-center text-xl font-medium">
          <FaTint className="fa fa-tint text-sky-500 mr-2" />
          {maxNivel.nivel_hidrometrico} m
        </div>
        {/* tiempo desde la ultima medición */}
        <h6 className="text-gray-500 text-base text-center mb-3">
          {maxNivel.stringTime}
        </h6>
      </div>
    </CardData>
  );
}
export default MaxLevelCard;
