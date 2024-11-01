import React from "react";
import NodoRecentDataContainer from "../components/NodoRecentDataContainer";
import LoadingSpinner from "../components/LoadingSpinner";
import MiniMap from "../components/MiniMap";

const CARD_HEIGHT = 300;
const CARD_WIDTH = 400;

const SensorInfoPanel = ({ data, loading }) => {
  const { latitud, longitud } = data.sensor;
  return (
    <div
      id="content"
      className="d-flex justify-content-between align-items-start"
    >
      <div>
        {loading || !data.paquetes.length ? (
          <LoadingSpinner />
        ) : (
          <NodoRecentDataContainer
            data={data.paquetes}
            CARD_HEIGHT={CARD_HEIGHT}
          />
        )}
      </div>
      <div
        id="mapa"
        className="d-none d-xl-block"
        style={{
          height: `${CARD_HEIGHT}px`,
          width: `${CARD_WIDTH}px`,
          backgroundColor: "grey",
        }}
      >
        <MiniMap lat={latitud} lng={longitud} />
      </div>
    </div>
  );
};

export default SensorInfoPanel;
