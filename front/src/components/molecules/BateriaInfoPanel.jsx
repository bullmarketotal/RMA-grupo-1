import React from "react";
import BateriaRecentDataContainer  from "./BateriaRecentDataContainer";
import { LoadingSpinner} from "../atoms";

const CARD_HEIGHT = 300;
const CARD_WIDTH = 400;

const BateriaInfoPanel = ({ sensor,data, loading }) => {
  const { latitud, longitud } = sensor;
  return (
    <div
      id="content"
      className="d-flex justify-content-between align-items-start"
    >
      <div>
        {loading || !data.length ? (
          <LoadingSpinner />
        ) : (
          <BateriaRecentDataContainer
            data={data}
            CARD_HEIGHT={CARD_HEIGHT}
          />
        )}
      </div>
    </div>
  );
};

export default BateriaInfoPanel;