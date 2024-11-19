import { useEffect } from "react";
import L from "leaflet";
import { obtenerStringTiempoDesdeUltimoDato } from "../components/utils/date";
import { backgroundColorBasedInAlarm } from "../components/utils/utils-graphs";
import config from "../config.json";


const useLoadNodos = (map, data, API_URL) => {
  useEffect(() => {
    if (!map || data?.length === 0) return;

    data.forEach((nodo) => {
      const TODAY = new Date(new Date().getTime() - 3 * 60 * 60 * 1000)
        .toISOString()
        .substring(0, 10);

      const FETCH_URL =
        API_URL + `/paquetes?sensor_id=${nodo.id}&start_date=${TODAY}&end_date=${TODAY}`; //habria que mostrarlos todos siempre o solo los del dia?

      fetch(FETCH_URL)
        .then((res) => res.json())
        .then((dataNodo) => {
          if (!dataNodo.items || dataNodo.items.length === 0) return;

          const lastData = dataNodo.items[dataNodo.items.length - 1];
          const stringUltimoDato = obtenerStringTiempoDesdeUltimoDato(dataNodo.items);

          const backgroundColor = backgroundColorBasedInAlarm(lastData.data, config.Alerts); // No se esta aplicando el color

          const popupContent = `
            <div class="roboto-light text-black p-2 border border-gray-800 shadow-md rounded-3xl font-serif text-sm" style="background-color: ${backgroundColor};">
              <span class="text-xs text-nowrap text-ellipsis">
                ${nodo.identificador}
              </span>
              <br />
              <i class="fa fa-tint mr-2"></i>
              <span class="roboto-bold text-base">${lastData.data.toFixed(1)}m</span>
              <br />
              <span class="text-[0.6rem] bold">${stringUltimoDato}</span>
            </div>
          `;

          const nodoMarker = L.marker([nodo.latitud, nodo.longitud]).addTo(map);

          nodoMarker.bindPopup(popupContent);
          

          nodoMarker.on("click", () => {
            nodoMarker.openPopup();
          });

          return () => {
            nodoMarker.remove();
          };
        })
        .catch((err) => console.error("Error fetching nodo data: ", err));
    });
  }, [data, map, API_URL]);

  return null;
};

export default useLoadNodos;
