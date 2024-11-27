import React, { useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { MdOutlineSettingsInputAntenna } from "react-icons/md";
import { useActivarNodo } from "../../hooks/useActivarNodo";
import "../../assets/font-awesome/css/font-awesome.min.css";
import { LoadingSpinner } from "../atoms";
import { useAuth } from "../../context/AuthProvider";
import { useNotification } from "../../context/NotificationContext";
const NodoInactivoCard = ({ nodo }) => {
  const { activarNodo } = useActivarNodo();
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { permisos } = useAuth();
  const { showNotification } = useNotification();
  const handleActivarNodo = async () => {
    setLoading(true);
    try {
      await activarNodo(nodo.id);
      showNotification("Nodo activado exitosamente", "success");
    } catch (error) {
      showNotification("Error activando el nodo:", "error");
    } finally {
      setLoading(false);
    }
  };

  const items = [
    { type_id: 1, data: 0 },
    { type_id: 25, data: 0 },
    { type_id: 16, data: 0 },
  ];

  const dataTemp = items.filter((item) => item.type_id === 1);
  const dataNivel = items.filter((item) => item.type_id === 25);
  const dataTension = items.filter((item) => item.type_id === 16);

  return (
    <div
      className={`roboto border-2 rounded-2xl p-3 ${
        isHovered ? "normal-bg" : "dark-bg"
      } dark:border-neutral-800 dark:text-neutral-50`}
    >
      <div className="flex">
        <div className="w-1/3 min-w-64">
          <h4 className="card-title flex items-center text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 font-semibold">
            <MdOutlineSettingsInputAntenna className="mr-2" />
            {nodo.identificador}
          </h4>
          <p className="normal-text text-sm py-2 mb-1">{nodo.descripcion}</p>
          <span className="text-xs sm:text-sm text-neutral-600">
            <i className="fa fa-map-marker me-2" aria-hidden="true"></i>
            <b>Latitud: </b>
            {nodo.latitud ? nodo.latitud.toFixed(5) : "N/A"}, <b>Longitud: </b>
            {nodo.longitud ? nodo.longitud.toFixed(5) : "N/A"}
          </span>

          <div className="flex items-center normal-text text-xl font-medium my-4 -ml-2">
            <span className="flex items-center">
              <i
                className={`fa fa-tint ${
                  isHovered ? "text-sky-500" : "text-neutral-500"
                } mx-2`}
              />
              {dataNivel.length > 0
                ? dataNivel[dataNivel.length - 1].data.toFixed(2)
                : "--"}
              m
            </span>
            <span className="flex items-center">
              <i
                className={`fa fa-thermometer ${
                  isHovered ? "text-rose-500" : "text-neutral-500"
                } mx-2`}
              />
              {dataTemp.length > 0
                ? dataTemp[dataTemp.length - 1].data.toFixed(2)
                : "--"}
              ºC
            </span>
            <span className="flex items-center mx-2">
              <BsFillLightningChargeFill
                className={`${
                  isHovered ? "text-yellow-500" : "text-neutral-500"
                }`}
              />
              {dataTension.length > 0
                ? dataTension[dataTension.length - 1].data.toFixed(2)
                : "--"}
              V
            </span>
          </div>
          {permisos.activar_nodos && (
            <div className="">
              <button
                onClick={handleActivarNodo}
                disabled={loading}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="roboto-medium mt-2 bg-sky-500 hover:bg-sky-400 dark:hover:bg-slate-900 text-neutral-100 font-bold py-2 px-4 rounded-2xl transition-all duration-100"
              >
                {loading ? <LoadingSpinner /> : "Activar Nodo"}
              </button>
            </div>
          )}
        </div>
        <div className="sm:flex sm:flex-col md:flex-row justify-end w-full hidden">
          <div className="md:h-full md:w-1/2 w-full"></div>
          <div className="md:h-full md:w-1/2 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default NodoInactivoCard;
