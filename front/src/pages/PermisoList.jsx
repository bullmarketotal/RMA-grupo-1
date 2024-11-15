import { useEffect, useState } from "react";
import axios from "../api/axios";
import Table from "../components/atoms/Table";
import React from "react";

const PermisoList = ({ onEdit, onDelete }) => {
  const [permisos, setPermisos] = useState([]);
  const [editablePermission, setEditablePermission] = useState(null);

  useEffect(() => {
    axios
      .get("/permisos")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPermisos(response.data);
        } else {
          console.error("La respuesta no es un arreglo:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los permisos:", error);
      });
  }, []);

  const handleSave = (updatedPermission) => {
    axios
      .put(`/permisos/${updatedPermission.id}`, updatedPermission)
      .then((response) => {
        const updatedPermisos = permisos.map((permiso) =>
          permiso.id === updatedPermission.id ? updatedPermission : permiso
        );
        setPermisos(updatedPermisos);
        setEditablePermission(null);
      })
      .catch((error) => {
        console.error("Error al guardar el permiso:", error);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        minWidth: 100,
      },
      {
        Header: "Identificador",
        accessor: "identificador",
        minWidth: 200,
        Cell: ({ row }) => {
          const isEditing =
            editablePermission && editablePermission.id === row.original.id;
          return isEditing ? (
            <input
              type="text"
              value={editablePermission.identificador}
              onChange={(e) =>
                setEditablePermission({
                  ...editablePermission,
                  identificador: e.target.value,
                })
              }
              className="border p-1 rounded-md"
            />
          ) : (
            row.values.identificador
          );
        },
      },
      {
        Header: "Descripción",
        accessor: "descripcion",
        minWidth: 200,
        Cell: ({ row }) => {
          const isEditing =
            editablePermission && editablePermission.id === row.original.id;
          return isEditing ? (
            <input
              type="text"
              value={editablePermission.descripcion}
              onChange={(e) =>
                setEditablePermission({
                  ...editablePermission,
                  descripcion: e.target.value,
                })
              }
              className="border p-1 rounded-md"
            />
          ) : (
            row.values.descripcion
          );
        },
      },
      {
        Header: "Acciones",
        id: "actions",
        minWidth: 150,
        Cell: ({ row }) => {
          const isEditing =
            editablePermission && editablePermission.id === row.original.id;
          return (
            <div className="flex justify-center gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => handleSave(editablePermission)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditablePermission(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditablePermission(row.original)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(row.original.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          );
        },
      },
    ],
    [editablePermission, permisos, onDelete]
  );

  return (
    <div className="max-w-5xl mx-auto">
      {permisos.length === 0 ? (
        <p>No hay permisos disponibles.</p>
      ) : (
        <Table columns={columns} data={permisos} />
      )}
    </div>
  );
};

export default PermisoList;
