import React, { useState, useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import useRolePermisos from "../hooks/useRolePermisos";
import usePermisos from "../hooks/usePermisos";
import useRoles from "../hooks/useRoles";
import useAsignarRevocarPermiso from "../hooks/useAsignarRevocarPermiso";
import TogglePanel from "./TogglePanel";

const RolesDisclosure = () => {
  const {
    permisos,
    loading: loadingPermisos,
    error: errorPermisos,
  } = usePermisos();
  const { roles, loading: loadingRoles, error: errorRoles } = useRoles();
  const {
    rolePermisos,
    loading: loadingRolePermisos,
    error: errorRolePermisos,
  } = useRolePermisos();

  const { assignPermisoToRole, revokePermisoFromRole } =
    useAsignarRevocarPermiso();
  const [rolesPermisos, setRolesPermisos] = useState({});

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
      console.log(
        `Permiso ${permisoId} ${!isAssigned ? "assigned to" : "revoked from"} role ${roleId}`
      );
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

  if (loadingPermisos || loadingRolePermisos) return <div>Loading...</div>;
  if (errorPermisos || errorRolePermisos) return <div>Error loading data</div>;

  return (
    <div className="p-4 max-w-screen-xl mx-auto bg-white shadow-lg rounded-lg">
      {roles.map((role) => (
        <Disclosure key={role.id} as="div" className="p-6">
          {({ open }) => (
            <>
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-sm/6 font-medium text-gray-900 group-hover:text-gray-700">
                  {role.name}
                </span>
                <ChevronDownIcon
                  className={`size-5 fill-gray-600 group-hover:fill-gray-400 ${open ? "rotate-180 transform" : ""}`}
                />
              </DisclosureButton>
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
    </div>
  );
};

export default RolesDisclosure;
