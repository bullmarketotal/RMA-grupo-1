import React from "react";
import NodoRecentDataContainer from "../components/NodoRecentDataContainer";
import LoadingSpinner from "../components/LoadingSpinner";
import MiniMap from "../components/MiniMap";

const CARD_HEIGHT = 300;

const SensorInfoPanel = ({ data, loading }) => {
  return (
    <div
      id="content"
      className="d-flex justify-content-between align-items-start"
    >
      <div>
        {loading || !data.data.length ? (
          <LoadingSpinner />
        ) : (
          <NodoRecentDataContainer data={data.data} CARD_HEIGHT={CARD_HEIGHT} />
        )}
      </div>
      <div
        id="mapa"
        className="d-none d-xl-block"
        style={{
          height: CARD_HEIGHT + "px",
          width: "400px",
        }}
      >
        {/* <MiniMap lat={data.sensor.lat} lng={data.sensor.lng} /> */}
      </div>
    </div>
  );
};

export default SensorInfoPanel;
