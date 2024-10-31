import PropTypes from "prop-types";
import { filterDataByTime, getMaxValue } from "./utils/sensorUtils";

const TIMEFRAME_24H = 1000 * 60 * 60 * 24;
const TIMEFRAME_7D = 1000 * 60 * 60 * 24 * 7;

function MaxLevelCard({ data, CARD_WIDTH, timeFrame }) {
  console.log("data", data);
  const filteredData = filterDataByTime(data, timeFrame);
  console.log(filteredData);
  const maxNivel = getMaxValue(filteredData, "nivel_hidrometrico");
  console.log(maxNivel);

  return (
    <div className="card me-3" style={{ width: CARD_WIDTH }}>
      <div className="card-header">
        <h6 className="card-title text-center mb-1">
          Pico {timeFrame === TIMEFRAME_24H ? "24hs" : "7 días"}
        </h6>
      </div>
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <div className="card-text fs-5 d-flex align-items-center">
          <i className="fa fa-tint me-2" aria-hidden="true" />
          {maxNivel.nivel_hidrometrico} m
        </div>
        <h6
          className="card-subtitle mb-2 text-body-secondary"
          style={{ whiteSpace: "nowrap", overflow: "hidden" }}
        >
          {maxNivel.stringTime}
        </h6>
      </div>
    </div>
  );
}

export default MaxLevelCard;
