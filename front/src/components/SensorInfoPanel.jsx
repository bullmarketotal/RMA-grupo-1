import React from "react";
import NodoRecentDataContainer from "../components/NodoRecentDataContainer";
import LoadingSpinner from "../components/LoadingSpinner";

const SensorInfoPanel = ({ data, loading, CARD_HEIGHT }) => (
  <div
    id="content"
    className="d-flex justify-content-between align-items-start"
  >
    {loading || !data?.length ? (
      <LoadingSpinner />
    ) : (
      <NodoRecentDataContainer data={data} CARD_HEIGHT={CARD_HEIGHT} />
    )}
    <div
      id="mapa"
      className="d-none d-xl-block"
      style={{
        height: CARD_HEIGHT + "px",
        width: "320px",
        backgroundColor: "lightblue",
      }}
    ></div>
  </div>
);

export default SensorInfoPanel;
