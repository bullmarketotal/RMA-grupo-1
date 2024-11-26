import React from "react";
import { Marker, Tooltip } from "react-leaflet";
import { MdOutlineSettingsInputAntenna } from "react-icons/md";
import { CreateCustomIcon } from "../utils";
import useColorBasedOnAlert from "../utils/getColorBasedOnAlert";
import { useNavigate } from "react-router-dom";
import { useBreadcrumbs } from "../../context/BreadcrumbsContext";

const NodoMarker = ({ nodo }) => {
  const navigate = useNavigate();
  const { setBreadcrumbs } = useBreadcrumbs();
  const {alertColor, loadingColor} = useColorBasedOnAlert(nodo);

  const handleNavigate = (e) => {
    setBreadcrumbs([
      { label: "Home", path: "/" },
      { label: `Nodo ${nodo.identificador}`, path: `/sensor/${nodo.id}` },
    ]);
    navigate(`/sensor/${nodo.id}`);
    e.originalEvent.preventDefault();
  };
  
  return (
    <Marker
      key={nodo.id}
      position={[nodo.latitud, nodo.longitud]}
      icon={CreateCustomIcon(alertColor, <MdOutlineSettingsInputAntenna />)}
      eventHandlers={{
        preclick: handleNavigate,
      }}
    >
      <Tooltip className="normal-bg rounded-lg shadow-lg overflow-hidden">
        <div className="">
          <h3 className="font-bold text-lg text-sky-500 mb-2">
            Nodo: {nodo.identificador}
          </h3>
          <p className="text-sm normal-text">
            <strong>Latitud:</strong> {nodo.latitud}
          </p>
          <p className="text-sm normal-text">
            <strong>Longitud:</strong> {nodo.longitud}
          </p>
        </div>
      </Tooltip>
    </Marker>
  );
};

export default NodoMarker;
