import React from "react";
import { Card, LoadingSpinner, MiniMap } from "../atoms";
import { MaxLevelCard, NodoRecentDataCard, NodoHeader } from "../molecules";

const TIMEFRAME_24H = 1000 * 60 * 60 * 24;
const TIMEFRAME_7D = 1000 * 60 * 60 * 24 * 7;

const NodoInfo = ({ data, loading }) => {
  const { latitud, longitud } = data.sensor;
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-80 pb-4">
        <div className="col-span-2">
          <NodoHeader sensor={data.sensor} />
        </div>
        <div className="row-span-2 shadow-sm rounded-lg overflow-hidden w-full h-full min-h-64">
          <MiniMap lat={latitud} lng={longitud} />
        </div>
        <div className="col-span-2 flex gap-4 items-center">
          <div className="w-1/2">
            <NodoRecentDataCard data={data.paquetes} />
          </div>
          <div className="w-1/2 flex gap-4">
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
