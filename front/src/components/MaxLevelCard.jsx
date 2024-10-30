import PropTypes from "prop-types";

const TIMEFRAME_24H = 1000 * 60 * 60 * 24;
const TIMEFRAME_7D = 1000 * 60 * 60 * 24 * 7;

const formatDate = (date, timeFrame) => {
  const options = { hour: "2-digit", minute: "2-digit", hour12: false };
  const dateObj = new Date(date); // Convierte a objeto Date
  if (timeFrame === TIMEFRAME_24H) {
    return dateObj.toLocaleTimeString([], options) + " hs";
  } else {
    return `${String(dateObj.getDate()).padStart(2, "0")}/${String(
      dateObj.getMonth() + 1
    ).padStart(2, "0")} - ${dateObj.toLocaleTimeString([], options)} hs`;
  }
};

const getMaxNivel = (data, timeFrame) => {
  const dateOfTimeFrame = new Date(Date.now() - timeFrame);

  if (
    data.length === 0 ||
    new Date(data[data.length - 1].date) < dateOfTimeFrame
  ) {
    return {
      nivel_hidrometrico: "--",
      stringTime: `Sin datos`,
    };
  }

  const max = data.reduce(
    (acc, current) => {
      const currentDate = new Date(current.date);
      return currentDate >= dateOfTimeFrame &&
        current.nivel_hidrometrico > acc.nivel_hidrometrico
        ? current
        : acc;
    },
    { nivel_hidrometrico: -Infinity }
  );

  if (max.nivel_hidrometrico === -Infinity) {
    return {
      nivel_hidrometrico: "--",
      stringTime: `Sin datos`,
    };
  }

  const dateOfMax = new Date(max.date);
  return {
    nivel_hidrometrico: max.nivel_hidrometrico.toFixed(1),
    stringTime: formatDate(dateOfMax, timeFrame),
  };
};

export default function MaxLevelCard({ data, CARD_WIDTH, timeFrame }) {
  const maxNivel = getMaxNivel(data, timeFrame);

  return (
    <div className="card me-2" style={{ width: CARD_WIDTH }}>
      <div className="card-header">
        <h6 className="card-title text-center mb-0">
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

MaxLevelCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      nivel_hidrometrico: PropTypes.number.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
  CARD_WIDTH: PropTypes.string.isRequired,
  timeFrame: PropTypes.number.isRequired,
};
