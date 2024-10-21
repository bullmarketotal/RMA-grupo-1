import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";

const MapaComponent = ({ setFormData }) => {
  const limites = [
    //no se estan usando
    [-44.342, -67.145], // suroeste
    [-42.594, -68.54], // noreste
  ];

  const posicionInicial = [-43.5042843, -65.7791978];
  const zoomInicial = 9;
  const [map, setMap] = useState(null); // Estado para almacenar la referencia al mapa

  useEffect(() => {
    if (L.DomUtil.get("map") !== null) {
      L.DomUtil.get("map")._leaflet_id = null;
    }

    const mapInstance = L.map("map", {
      maxBoundsViscosity: 0,
      minZoom: 9,
    }).setView(posicionInicial, zoomInicial);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    const marker = L.marker(posicionInicial).addTo(mapInstance); //marcador

    mapInstance.on("click", function (e) {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]); // actualiza la posicion del marcador
      mapInstance.setView([lat, lng], mapInstance.getZoom());
      setFormData((prev) => ({ ...prev, latitud: lat, longitud: lng }));
    });

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [setFormData]);

  const centerMap = () => {
    if (map) {
      map.setView(posicionInicial, zoomInicial);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div id="map" style={{ height: "400px" }}></div>
      <button
        type="button"
        onClick={centerMap}
        className="btn btn-light"
        style={{
          position: "absolute",
          top: "10px",
          left: "100px",
          zIndex: 1000,
        }}
      >
        <i
          className="bi bi-arrow-counterclockwise"
          style={{ fontSize: "22px" }}
        ></i>
      </button>
    </div>
  );
};

export default MapaComponent;
