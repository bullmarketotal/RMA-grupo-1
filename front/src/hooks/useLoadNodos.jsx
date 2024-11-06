import { useEffect } from "react";
import ReactDOMServer from 'react-dom/server';
import L from "leaflet";

import NodoMarker from "../components/atoms/NodoMarker";

export const useLoadNodos = (map, data, API_URL) => {
  useEffect(() => {
    if (!map || data?.length === 0) return;

    data.forEach((nodo) => {
      const TODAY = new Date(new Date().getTime() - 3 * 60 * 60 * 1000)
        .toISOString()
        .substring(0, 10);

      const FETCH_URL =
        API_URL +
        `/paquetes?sensor_id=${nodo.id}&start_date=${TODAY}&end_date=${TODAY}`;

      fetch(FETCH_URL)
        .then((res) => res.json())
        .then((dataNodo) => {
          let customIcon;

          customIcon = L.divIcon({
            className: "",
            html: ReactDOMServer.renderToString(<NodoMarker nodo={nodo} dataNodo={dataNodo} />),
          });

          const nodoMarker = L.marker([nodo.latitud, nodo.longitud], {
            icon: customIcon,
            draggable: false,
          }).addTo(map);

          nodoMarker.on("click", () => {
            window.open(`/sensor/${nodo.id}`, "_blank");
          });
        });
    });
  }, [data]);
};
