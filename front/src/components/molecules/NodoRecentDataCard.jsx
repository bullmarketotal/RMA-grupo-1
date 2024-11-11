import React from "react";
import { obtenerTimeAgoString } from "../utils/date";
import { CardData } from "../atoms";

const NodoRecentDataCard = React.memo(({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center">No hay datos disponibles.</p>;
  }
  const lastData = data[data.length - 1];
  const timeAgoString = obtenerTimeAgoString(lastData);

  return (
    <CardData title={"Últimos Datos"}>
      <div className="flex flex-col items-center">
        <div className="flex items-center normal-text text-xl font-medium">
          {/* Temperatura */}
          <span className="flex items-center">
            <i className="fa fa-tint text-sky-500 mx-2" />
            {lastData.nivel_hidrometrico.toFixed(2)} m
          </span>
          {/* Nivel Hidrometrico */}
          <span className="flex items-center">
            <i className="fa fa-thermometer text-rose-500 mx-2" />
            {lastData.temperatura.toFixed(1)} ºC
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
