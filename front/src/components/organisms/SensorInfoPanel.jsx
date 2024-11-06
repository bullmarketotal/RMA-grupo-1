import React from "react";
import { Card, LoadingSpinner, MiniMap } from "../atoms";
import { MaxLevelCard, NodoRecentDataCard } from "../molecules";

const CARD_HEIGHT = 300;
const CARD_WIDTH = 400;

const TIMEFRAME_24H = 1000 * 60 * 60 * 24;
const TIMEFRAME_7D = 1000 * 60 * 60 * 24 * 7;
const SensorInfoPanel = ({ data, loading }) => {
  const { latitud, longitud } = data.sensor;
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Card>
          <div className="d-flex space-x-4 items-center">
            <div className="w-1/3">
              {/* Latest data */}
              <NodoRecentDataCard
                CARD_HEIGHT={CARD_HEIGHT}
                data={data.paquetes}
              />
            </div>
            <div className="flex w-1/3 space-x-4">
              {/* Recent data 7d */}
              <div className="w-1/2">
                <MaxLevelCard data={data.paquetes} timeFrame={TIMEFRAME_7D} />
              </div>
              {/* Recent data 24hs */}
              <div className="w-1/2">
                <MaxLevelCard data={data.paquetes} timeFrame={TIMEFRAME_24H} />
              </div>
            </div>
            <div className="flex w-1/3 h-full">
              <div className="W-80 rounded-lg overflow-hidden w-full h-96">
                <MiniMap lat={latitud} lng={longitud} />
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default SensorInfoPanel;
