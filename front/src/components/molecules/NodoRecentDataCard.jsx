import React from "react";
import { obtenerTimeAgoString } from "../utils/date";
import { CardData } from "../atoms";

const NodoRecentDataCard = React.memo(({ dataTemp, dataNivel }) => {
  console.log("DATATEMPP:",dataTemp);
  if (!dataTemp || dataTemp.length === 0 || !dataNivel || dataNivel.length === 0) {
    return <p className="text-center">No hay datos disponibles.</p>;
  }
  const lastDataNivel = dataNivel[dataNivel.length - 1];
  const lastDataTemp = dataTemp[dataTemp.length - 1];
  const timeAgoString = obtenerTimeAgoString(lastDataTemp);

  return (
    <CardData title={"Últimos Datos"}>
      <div className="flex flex-col items-center">
        <div className="flex items-center normal-text text-xl font-medium">
          {/* Temperatura */}
          <span className="flex items-center">
            <i className="fa fa-tint text-sky-500 mx-2" />
            {lastDataNivel.data.toFixed(2)} m
          </span>
          {/* Nivel Hidrometrico */}
          <span className="flex items-center">
            <i className="fa fa-thermometer text-rose-500 mx-2" />
            {lastDataTemp.data.toFixed(1)} ºC
          </span>
        </div>
        {/* Tiempo desde la ultima medición */}
        <h6 className="text-gray-500 text-base text-center mb-3">
          {timeAgoString}
        </h6>
      </div>
    </CardData>
  );
});

export default NodoRecentDataCard;
