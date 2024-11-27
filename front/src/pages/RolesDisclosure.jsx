import React, { useState, useEffect } from "react";
import useRolePermisos from "../hooks/useRolePermisos";
import usePermisos from "../hooks/usePermisos";
import useRoles from "../hooks/useRoles";
import useAsignarRevocarPermiso from "../hooks/useAsignarRevocarPermiso";
import RoleItem from "./RoleItem";
import LoadingSkeleton from "../components/atoms/LoadingSkeleton";
import AddRoleForm from "./AddRoleForm";

const RolesDisclosure = () => {
  const {
    roles,
    loading: loadingRoles,
    error: errorRoles,
    deleteRole,
    updateRole,
    addRole,
  } = useRoles();
  const {
    permisos,
    loading: loadingPermisos,
    error: errorPermisos,
  } = usePermisos();
  const {
    rolePermisos,
    loading: loadingRolePermisos,
    error: errorRolePermisos,
  } = useRolePermisos();

  const { assignPermisoToRole, revokePermisoFromRole } =
    useAsignarRevocarPermiso();
  const [rolesPermisos, setRolesPermisos] = useState({});
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");

  useEffect(() => {
    if (rolePermisos.length > 0 && permisos.length > 0) {
      const initialRolesPermisos = roles.reduce((acc, role) => {
        acc[role.id] = permisos.reduce((permAcc, permiso) => {
          permAcc[permiso.id] = rolePermisos.some(
            (rp) => rp.role_id === role.id && rp.permiso_id === permiso.id
          );
          return permAcc;
        }, {});
        return acc;
      }, {});
      setRolesPermisos(initialRolesPermisos);
    }
  }, [rolePermisos, permisos, roles]);

  const togglePermiso = async (roleId, permisoId) => {
    const isAssigned = rolesPermisos[roleId][permisoId];

    // Optimistic update
    setRolesPermisos((prevState) => ({
      ...prevState,
      [roleId]: {
        ...prevState[roleId],
        [permisoId]: !prevState[roleId][permisoId],
      },
    }));

    try {
      if (!isAssigned) {
        await assignPermisoToRole({ role_id: roleId, permiso_id: permisoId });
      } else {
        await revokePermisoFromRole({ role_id: roleId, permiso_id: permisoId });
      }
    } catch (error) {
      // Revert optimistic update if API call fails
      setRolesPermisos((prevState) => ({
        ...prevState,
        [roleId]: {
          ...prevState[roleId],
          [permisoId]: isAssigned,
        },
      }));
    }
  };

  const handleEdit = (role) => {
    setEditingRoleId(role.id);
    setNewRoleName(role.name);
    setNewRoleDesc(role.descripcion);
  };

  const handleCancelEdit = () => {
    setEditingRoleId(null);
    setNewRoleName("");
    setNewRoleDesc("");
  };

  const handleSaveEdit = async (role) => {
    await updateRole(role.id, { name: newRoleName, descripcion: newRoleDesc });
    setEditingRoleId(null);
  };

  const handleDelete = async (roleId) => {
    try {
      await deleteRole(roleId);
    } catch (error) {
      console.error("Error eliminando el rol", error);
    }
  };

  const handleAddRole = async (role) => {
    try {
      await addRole(role);
    } catch (error) {
      console.error("Error agregando el rol", error);
    }
  };

  if (loadingPermisos || loadingRolePermisos || loadingRoles)
    return <LoadingSkeleton />;
  if (errorPermisos || errorRolePermisos || errorRoles)
    return <div>Error cargando los datos</div>;

  return (
    <div className="max-w-screen-xl mx-auto normal-bg shadow-sm divide-y divide-neutral-600/5 dark:divide-white/5">
      <div className="grid grid-cols-2 font-semibold normal-text">
        <div>Nombre</div>
        <div>Descripción</div>
      </div>
      {roles.map((role) => (
        <RoleItem
          key={role.id}
          role={role}
          permisos={permisos}
          rolesPermisos={rolesPermisos}
          togglePermiso={togglePermiso}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
          isEditing={editingRoleId === role.id}
          newRoleName={newRoleName}
          newRoleDesc={newRoleDesc}
          setNewRoleName={setNewRoleName}
          setNewRoleDesc={setNewRoleDesc}
        />
      ))}
      <AddRoleForm onAddRole={handleAddRole} />
    </div>
  );
};

export default RolesDisclosure;
