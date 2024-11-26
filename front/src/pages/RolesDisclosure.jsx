import React, { useState, useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
  KeyIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import useRolePermisos from "../hooks/useRolePermisos";
import usePermisos from "../hooks/usePermisos";
import useRoles from "../hooks/useRoles";
import useAsignarRevocarPermiso from "../hooks/useAsignarRevocarPermiso";
import TogglePanel from "./TogglePanel";
import LoadingSkeleton from "../components/atoms/LoadingSkeleton";
import AddRoleForm from "./AddRoleForm";
import ConfirmationPopover from "../components/atoms/ConfirmationPopover";

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
    await updateRole(role.id, {
      name: newRoleName,
      descripcion: newRoleDesc,
    });
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
      console.error("Error eliminando el rol", error);
    }
  };

  if (loadingPermisos || loadingRolePermisos || loadingRoles)
    return <LoadingSkeleton />;
  if (errorPermisos || errorRolePermisos || errorRoles)
    return <div>Error cargando los datos</div>;

  return (
    <div className="p-2 max-w-screen-xl mx-auto normal-bg shadow-sm divide-y divide-neutral-600/5 dark:divide-white/5">
      <div className="grid grid-cols-2 font-semibold normal-text ">
        <div>Nombre</div>
        <div>Descripción</div>
      </div>
      {roles.map((role) => (
        <Disclosure key={role.id} as="div" className="p-2">
          {({ open }) => (
            <>
              <div className="flex justify-between items-center">
                {editingRoleId === role.id ? (
                  <>
                    <input
                      type="text"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      className="input-text w-full max-w-xs mr-2"
                    />
                    <input
                      type="text"
                      value={newRoleDesc}
                      onChange={(e) => setNewRoleDesc(e.target.value)}
                      className="input-text w-full max-w-xs"
                    />
                    <button
                      onClick={() => handleSaveEdit(role)}
                      className="btn btn-success ml-2"
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="btn btn-danger ml-2"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 w-full">
                      <span className="text-base normal-text">{role.name}</span>
                      <span className="text-base normal-text">
                        {role.descripcion}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className="p-2 rounded-md btn-active btn-action"
                        onClick={() => handleEdit(role)}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </span>
                      <ConfirmationPopover
                        onConfirm={() => handleDelete(role.id)}
                        onCancel={() => console.log("Cancel")}
                      >
                        <span className="p-2 rounded-md btn-alert">
                          <TrashIcon className="h-5 w-5" />
                        </span>
                      </ConfirmationPopover>
                      <DisclosureButton className="p-1 rounded-md bg-emerald-500 text-white hover:bg-emerald-700 flex items-center">
                        <KeyIcon className="h-5 w-5 mr-1" />
                        Permisos
                        <ChevronDownIcon
                          className={`h-5 w-5 ml-1 ${
                            open ? "rotate-180 transform" : ""
                          }`}
                        />
                      </DisclosureButton>
                    </div>
                  </>
                )}
              </div>
              <DisclosurePanel className="mt-2 text-sm/5 text-gray-500">
                <TogglePanel
                  items={permisos}
                  enabledItems={rolesPermisos[role.id] || {}}
                  toggleItem={(permisoId) => togglePermiso(role.id, permisoId)}
                />
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
      <AddRoleForm onAddRole={handleAddRole} />
    </div>
  );
};

export default RolesDisclosure;
