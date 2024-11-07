import React from "react";
import BateriaRecentDataContainer  from "./BateriaRecentDataContainer";
import { LoadingSpinner} from "../atoms";

const CARD_HEIGHT = 300;
const CARD_WIDTH = 400;

const BateriaInfoPanel = ({ data, loading }) => {
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
          <BateriaRecentDataContainer
            data={data.paquetes}
            CARD_HEIGHT={CARD_HEIGHT}
          />
        )}
      </div>
    </div>
  );
};

export default BateriaInfoPanel;