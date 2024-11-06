import React from "react";
import { Card, LoadingSpinner, MiniMap } from "../atoms";
import { MaxLevelCard, NodoRecentDataCard, SensorHeader } from "../molecules";

const TIMEFRAME_24H = 1000 * 60 * 60 * 24;
const TIMEFRAME_7D = 1000 * 60 * 60 * 24 * 7;

const NodoInfo = ({ data, loading }) => {
  const { latitud, longitud } = data.sensor;
  return (
    <Card>
      <div className="grid grid-cols-3 grid-rows-3 gap-4">
        <div className="col-span-2">
          <SensorHeader sensor={data.sensor} />
        </div>
        <div className="row-span-3 col-start-3 shadow-sm rounded-lg overflow-hidden w-full h-full">
          <MiniMap lat={latitud} lng={longitud} />
        </div>
        <div className="col-span-2 row-span-2 flex gap-4">
          <div className="w-1/2">
            <NodoRecentDataCard data={data.paquetes} />
          </div>
          <div className="flex w-1/2 space-x-4">
            <div className="w-1/2">
              <MaxLevelCard data={data.paquetes} timeFrame={TIMEFRAME_7D} />
            </div>
            <div className="w-1/2">
              <MaxLevelCard data={data.paquetes} timeFrame={TIMEFRAME_24H} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NodoInfo;
