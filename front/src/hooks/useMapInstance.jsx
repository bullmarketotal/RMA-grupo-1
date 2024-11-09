import { useState, useEffect } from "react";
import L from "leaflet";

const useMapInstance = (posicionInicial, zoomInicial, limites) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (L.DomUtil.get("map") !== null) {
      L.DomUtil.get("map")._leaflet_id = null;
    }

    const mapInstance = L.map("map", {
      maxBounds: limites,
      minZoom: 7,
      maxBoundsViscosity: 0.1,
      attributionControl: false,
    }).setView(posicionInicial, zoomInicial);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  return map;
};

export default useMapInstance;
