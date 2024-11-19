const BASE_CLASSES_FOR_MARKERS =
  " roboto-light text-black p-2 border border-gray-800 shadow-md rounded-3xl font-serif text-sm hover:text-m w-32 hover:-translate-y-1 text-center text-center transition-all duration-300";

  import { backgroundColorBasedInAlarm } from "../utils/utils-graphs";
  import { obtenerStringTiempoDesdeUltimoDato } from "../utils/date";
  import config from "../../config.json";


const NodoMarker = ({ nodo, dataNodo }) => {
  if (dataNodo?.length === 0)
    return (
      <div className={`${BASE_CLASSES_FOR_MARKERS} bg-gray-400`}>
        <span className="text-xs text-nowrap text-ellipsis">
          {nodo.identificador}
        </span>
        <br />
        <i className="fa fa-exclamation-triangle mr-2" /> <span className="italic text-xs">Offline</span>
      </div>
    );

   const lastData = dataNodo.items[dataNodo.items.length - 1];
   const stringUltimoDato = obtenerStringTiempoDesdeUltimoDato(dataNodo.items);

  return (
    <div className={`${BASE_CLASSES_FOR_MARKERS} bg-gradient-to-tr ${backgroundColorBasedInAlarm(lastData.data, config.Alerts)}`}>
      <span className="text-xs text-nowrap text-ellipsis">
        {nodo.identificador}
      </span>
      <br />
      <i className="fa fa-tint mr-2" />{" "}
      <span className="roboto-bold text-base">
        {lastData.data.toFixed(1)}m
      </span>
      <br />
      <span className="text-[0.6rem] bold ">{stringUltimoDato}</span>
    </div>
  );
};

export default NodoMarker;
