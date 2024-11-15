import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import Table from "../components/atoms/Table";
import { useAssignPermiso, usePermissions } from "../hooks/usePermissionsApi";
import {
  useCreateRole,
  useDeleteRole,
  useRoles,
  useUpdateRole,
} from "../hooks/useRolesApi";
import AssignPermissionsModal from "./AssignPermissions";

const RoleList = () => {
  const [editingRow, setEditingRow] = useState(null);
  const [editedRole, setEditedRole] = useState(null);
  const [newRole, setNewRole] = useState({ name: "", description: "" });
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const { loading: creating, error: createError, createRole } = useCreateRole();
  const { roles, loading, error, getRoles } = useRoles();
  const { loading: updating, error: updateError, updateRole } = useUpdateRole();
  const { loading: deleting, error: deleteError, deleteRole } = useDeleteRole();
  const { permissions, getPermissions } = usePermissions();
  const {
    assignPermiso,
    loading: assigningPermissions,
    error: assignError,
  } = useAssignPermiso();

  useEffect(() => {
    getRoles();
    getPermissions();
  }, []);

  const openPermissionsModal = (role) => {
    setSelectedRole(role);
    setIsPermissionsModalOpen(true);
  };

  const closePermissionsModal = () => {
    setSelectedRole(null);
    setIsPermissionsModalOpen(false);
  };

  const handleAssignPermissions = (data) => {
    console.log("Datos enviados al backend:", data);
    assignPermiso(data).then(() => {
      closePermissionsModal();
      getRoles();
    });
  };

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      {
        Header: "Nombre",
        accessor: "name",
        Cell: ({ row }) => {
          const isEditing = editingRow === row.id;
          return isEditing ? (
            <input
              type="text"
              value={editedRole?.name || row.original.name}
              onChange={(e) =>
                setEditedRole({ ...editedRole, name: e.target.value })
              }
            />
          ) : (
            row.original.name
          );
        },
      },
      {
        Header: "Descripción",
        accessor: "description",
        Cell: ({ row }) => {
          const isEditing = editingRow === row.id;
          return isEditing ? (
            <input
              type="text"
              value={editedRole?.description || row.original.description}
              onChange={(e) =>
                setEditedRole({ ...editedRole, description: e.target.value })
              }
            />
          ) : (
            row.original.description
          );
        },
      },
      {
        Header: "Acciones",
        id: "actions",
        Cell: ({ row }) => {
          const isEditing = editingRow === row.id;
          return (
            <div className="flex justify-center gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => handleSave(row.original.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openPermissionsModal(row.original)}
                    className="bg-sky-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Asignar Permisos
                  </button>
                  <button
                    onClick={() => {
                      setEditingRow(row.id);
                      setEditedRole(row.original);
                    }}
                    className="bg-amber-500 text-white px-3 py-1 rounded-md text-base"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(row.original.id)}
                    className="bg-rose-500 text-white px-3 py-1 rounded-md text-base"
                  >
                    <AiOutlineDelete />
                  </button>
                </>
              )}
            </div>
          );
        },
      },
    ],
    [editingRow, editedRole]
  );

  const handleSave = (id) => {
    const updatedRow = {
      id,
      name: editedRole?.name || "",
      description: editedRole?.description || "",
    };
    updateRole(id, updatedRow).then(() => {
      getRoles();
      setEditingRow(null);
      setEditedRole(null);
    });
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditedRole(null);
  };

  const handleCreateRole = () => {
    if (!newRole.name || !newRole.description) {
      alert("Debe completar todos los campos.");
      return;
    }
    createRole(newRole).then(() => {
      setNewRole({ name: "", description: "" });
      getRoles();
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este rol?")) {
      deleteRole(id).then(() => getRoles());
    }
  };

  const isLoading =
    loading || creating || updating || deleting || assigningPermissions;

  if (isLoading) return <div>Cargando...</div>;
  if (error || createError || updateError || deleteError || assignError)
    return (
      <div>
        Error:{" "}
        {error || createError || updateError || deleteError || assignError}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto">
      {roles.length === 0 ? (
        <p>No hay roles disponibles.</p>
      ) : (
        <Table columns={columns} data={roles} />
      )}

      <table className="table-container mt-6">
        <tbody>
          <tr className="bg-gray-200">
            <td>
              <input
                type="text"
                placeholder="Nombre del rol"
                value={newRole.name}
                onChange={(e) =>
                  setNewRole({ ...newRole, name: e.target.value })
                }
                className="border px-3 py-1 rounded-md w-full"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Descripción del rol"
                value={newRole.description}
                onChange={(e) =>
                  setNewRole({ ...newRole, description: e.target.value })
                }
                className="border px-3 py-1 rounded-md w-full"
              />
            </td>
            <td>
              <button
                onClick={handleCreateRole}
                className="bg-sky-500 text-white px-3 py-1 w-full rounded-md"
              >
                Crear
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Modal permisos */}
      <AssignPermissionsModal
        isOpen={isPermissionsModalOpen}
        onClose={closePermissionsModal}
        permissions={permissions}
        onSubmit={handleAssignPermissions}
      />
    </div>
  );
};

export default RoleList;
