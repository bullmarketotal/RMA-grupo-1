import { useEffect } from "react";
import L from "leaflet";
import { backgroundColorBasedInAlarm } from "../components/utils/utils-graphs";
import { obtenerStringTiempoDesdeUltimoDato } from "../components/utils/date";
import config from "../config.json"

const BASE_CLASSES_FOR_MARKERS = " roboto-light text-black p-2 border border-gray-800 shadow-md rounded-3xl font-serif text-sm hover:text-m w-32 hover:-translate-y-1 text-center text-center transition-all duration-300"

export const useLoadNodos = (map, data, API_URL) => {
    console.log("useLoadNodos", data)

    useEffect(() => {
        if(!map || data?.length === 0)
          return;
    
        data.forEach(nodo => {
          const TODAY = new Date(new Date().getTime() - 3 * 60 * 60 * 1000).toISOString().substring(0, 10);
    
          const FETCH_URL = API_URL + `/paquetes?sensor_id=${nodo.id}&start_date=${TODAY}&end_date=${TODAY}`
          
          fetch(FETCH_URL)
          .then(res => res.json())
          .then(dataNodo => {
            let customIcon;
    
            // Caso sin datos hoy
            if(dataNodo.length === 0){
              customIcon = L.divIcon({
                className: '',
                html: `
                <div class="${BASE_CLASSES_FOR_MARKERS} bg-gray-400">
                  <span class="text-xs text-nowrap text-ellipsis">${nodo.identificador}</span>
                  <br/>
                  <span class="font-bold">S/D</span>
                </div>`
              });
            } 
            // Caso con datos hoy
            else {
    
              const lastData = dataNodo[dataNodo.length - 1];
    
              const stringUltimoDato = obtenerStringTiempoDesdeUltimoDato(dataNodo);
    
              customIcon = L.divIcon({
                className: '',
                html: `<div class="${BASE_CLASSES_FOR_MARKERS} bg-gradient-to-tr ${backgroundColorBasedInAlarm(lastData.nivel_hidrometrico, config.Alerts)}">
                  <span class="text-xs text-nowrap text-ellipsis">${nodo.identificador}</span>
                  <br/>
                  <i className="fa fa-tint mr-2" /> <span class="roboto-bold text-base">${lastData.nivel_hidrometrico.toFixed(1)}m</span>
                  <br/>
                  <span class="text-[0.6rem] bold ">${stringUltimoDato}</span>
                </div>`
              });
            }
    
            const nodoMarker = L.marker([nodo.latitud, nodo.longitud], {
              icon: customIcon,
              draggable: false
            }).addTo(map);
    
            nodoMarker.on('click', () => {
              window.open(`/sensor/${nodo.id}`, '_blank');
            });
          })
    
        });
    
      }, [data])

}