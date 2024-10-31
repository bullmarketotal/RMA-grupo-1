import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Configuración del icono del marcador
const markerIcon = new L.Icon({
  //iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const ZOOM = 13;

function MiniMap({ lat, lng }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMapSize = () => setIsExpanded(!isExpanded);

  return (
    <div onClick={toggleMapSize} style={{ cursor: "pointer" }}>
      <MapContainer
        center={[lat, lng]}
        zoom={ZOOM}
        style={{
          width: isExpanded ? "100%" : "200px",
          height: isExpanded ? "400px" : "150px",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={[lat, lng]} icon={markerIcon}>
          {" "}
          {/* Marcador en el punto especificado */}
        </Marker>
      </MapContainer>
    </div>
  );
}
export default MiniMap;
