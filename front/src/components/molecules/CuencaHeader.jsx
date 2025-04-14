import React, { useState, useEffect } from "react";
import { ConfirmationPopover, LoadingSpinner } from "../atoms";
import { MdOutlineSettingsInputAntenna } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {useCuencas} from "../../hooks/useCuencas";
import { useNotification } from "../../context/NotificationContext";

const CuencaHeader = ({ cuenca, loading }) => {
  const [isEditing, setIsEditing] = useState(false);


  const [editableCuenca, setEditableCuenca] = useState({
    nombre: cuenca.nombre,
    descripcion: cuenca.descripcion,
  });
  const { deleteCuenca, updateCuenca, loading: loadingNodo } = useCuencas();
  const { showNotification } = useNotification();

  const navigate = useNavigate();

  useEffect(() => {
    setEditableCuenca({
      nombre: cuenca.nombre || "",
      descripcion: cuenca.descripcion || "",
    });
  }, [cuenca]); //se ejecuta cada vez que cuenca cambia
  

  const handleDelete = async (nodoId) => {
    try {
      await deleteCuenca(nodoId);
      showNotification("Cuenca eliminada exitosamente", "success");
    } catch (error) {
      console.error("Error eliminando la cuenca", nodoId, error);
      showNotification("Error eliminando la cuenca", "error");
    }
  };

  const handleUpdate = async () => {
    if (isEditing) {
      try {
        await updateCuenca(cuenca.id, editableCuenca);
        console.log("Cuenca actualizado:", editableCuenca);
        showNotification("Cuenca actualizada exitosamente", "success");
      } catch (error) {
        console.error("Error actualizando la cuenca:", error);
        showNotification("Error actualizando la cuenca", "error");
      }
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableCuenca({
      ...editableCuenca,
      [name]:
        name === "latitud" || name === "longitud"
          ? parseFloat(value) || 0
          : value,
    });
  };

  const idCuenca = cuenca.id;

  return (
    <div id="header" className="relative flex items-start justify-between ">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div
            id="info-cuenca"
            className="flex-grow max-w-2xl flex flex-col space-y-2"
          >
            <h1 className="flex text-3xl items-center normal-text font-semibold">
              <MdOutlineSettingsInputAntenna className="mr-2" />
              {isEditing ? (
                <input
                  type="text"
                  name="nombre"
                  value={editableCuenca.nombre}
                  onChange={handleChange}
                  className="normal-text input-text border max-w-80 border-gray-300 rounded px-2 py-1 w-32"
                />
              ) : (
                editableCuenca.nombre
              )}
            </h1>
            <div
              className={`normal-text text-sm ${isEditing ? "w-full" : "w-auto"}`}
            >
              {isEditing ? (
                <>
                  <textarea
                    className="input-text min-w-80 mt-8 max-w-120 flex-shrink"
                    id="descripcion"
                    name="descripcion"
                    value={editableCuenca.descripcion}
                    onChange={handleChange}
                    maxLength={256}
                    rows={4}
                  />
                  <div className="text-input text-right text-sm text-gray-500 mt-1">
                    {256 - editableCuenca.descripcion.length} caracteres
                    restantes
                  </div>
                </>
              ) : (
                <div className="max-w-lg">{editableCuenca.descripcion}</div>
              )}
            </div>
          </div>

          <div
            id="action-buttons"
            className="flex flex-row space-x-2 absolute right-0 top-0"
          >
            <button
              id="btn-modificar"
              className="h-16 w-32 btn-action btn-active"
              onClick={handleUpdate}
            >
              {isEditing ? "Guardar" : "Modificar Cuenca"}
            </button>
            <ConfirmationPopover
              onConfirm={() => handleDelete(cuenca.id)}
              onCancel={() => console.log("Cancel")}
            >
              <span
                id="btn-eliminar"
                className="flex items-center justify-center h-16 w-32 btn-alert"
              >
                Eliminar Cuenca
              </span>
            </ConfirmationPopover>
          </div>
        </>
      )}
    </div>
  );
};

export default CuencaHeader;
