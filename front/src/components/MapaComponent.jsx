import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";

const MapaComponent = ({ setFormData }) => {
  const limites = [
    [-42.342, -62.145], // suroeste
    [-45.594, -71.54],  // noreste
  ];

  const posicionInicial = [-43.5042843, -65.7791978];
  const zoomInicial = 9;
  
  const [map, setMap] = useState(null); // Estado para almacenar la referencia al mapa
  const [marker, setMarker] = useState(null); // Estado para el marcador

  useEffect(() => {
    if (L.DomUtil.get("map") !== null) {
      L.DomUtil.get("map")._leaflet_id = null;
    }

    const mapInstance = L.map("map", {
      maxBounds: limites,
      minZoom:7,
      maxBoundsViscosity: 0.1,
    }).setView(posicionInicial, zoomInicial);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    const newMarker = L.marker(posicionInicial, { draggable: true }).addTo(mapInstance);
    setMarker(newMarker); // Guardar el marcador en el estado

    newMarker.on("dragend", function (e) {
      const position = newMarker.getLatLng();
      const { lat, lng } = position;
      setFormData((prev) => ({ ...prev, latitud: lat, longitud: lng }));
    });

    mapInstance.on("click", function (e) {
      const { lat, lng } = e.latlng;
      if (mapInstance.getBounds().contains([lat, lng])) {
        newMarker.setLatLng([lat, lng]); // actualiza la posición del marcador
        mapInstance.setView([lat, lng], mapInstance.getZoom());
        setFormData((prev) => ({ ...prev, latitud: lat, longitud: lng }));
      }
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
