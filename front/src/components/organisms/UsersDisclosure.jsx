import React, { useState, useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import useUsuariosRoles from "../../hooks/useUsuariosRoles";
import useUsuarios from "../../hooks/useUsuarios";
import useRoles from "../../hooks/useRoles";
import useAsignarRevocarRol from "../../hooks/useAsignarRevocarRol";
import TogglePanel from "../molecules/TogglePanel";
import LoadingSkeleton from "../atoms/LoadingSkeleton";

const UsuariosDisclosure = () => {
  const { roles, loading: loadingRoles, error: errorRoles } = useRoles();
  const {
    data: usuarios,
    loading: loadingUsuarios,
    error: errorUsuarios,
  } = useUsuarios();
  const {
    usuariosRoles,
    loading: loadingUsuariosRoles,
    error: errorUsuariosRoles,
  } = useUsuariosRoles();
  const { assignRoleToUsuario, revokeRoleFromUsuario } = useAsignarRevocarRol();
  const [usuariosRolesState, setUsuariosRolesState] = useState({});

  useEffect(() => {
    if (
      Array.isArray(usuariosRoles) &&
      Array.isArray(roles) &&
      Array.isArray(usuarios) &&
      usuariosRoles.length > 0 &&
      roles.length > 0 &&
      usuarios.length > 0
    ) {
      const initialUsuariosRolesState = usuarios.reduce((acc, usuario) => {
        acc[usuario.id] = roles.reduce((roleAcc, role) => {
          roleAcc[role.id] = usuariosRoles.some(
            (ur) => ur.usuario_id === usuario.id && ur.role_id === role.id
          );
          return roleAcc;
        }, {});
        return acc;
      }, {});
      setUsuariosRolesState(initialUsuariosRolesState);
    }
  }, [usuariosRoles, roles, usuarios]);

  const toggleRole = async (usuarioId, roleId) => {
    const isAssigned = usuariosRolesState[usuarioId][roleId];

    // Optimistic update
    setUsuariosRolesState((prevState) => ({
      ...prevState,
      [usuarioId]: {
        ...prevState[usuarioId],
        [roleId]: !prevState[usuarioId][roleId],
      },
    }));

    try {
      if (!isAssigned) {
        await assignRoleToUsuario({ usuario_id: usuarioId, role_id: roleId });
      } else {
        await revokeRoleFromUsuario({ usuario_id: usuarioId, role_id: roleId });
      }
      console.log(
        `Role ${roleId} ${!isAssigned ? "assigned to" : "revoked from"} usuario ${usuarioId}`
      );
    } catch (error) {
      // Revert optimistic update if API call fails
      setUsuariosRolesState((prevState) => ({
        ...prevState,
        [usuarioId]: {
          [roleId]: isAssigned,
        },
      }));
    }
  };

  return (
    <div className="p-2 max-w-screen-xl mx-auto normal-bg shadow-sm divide-y divide-neutral-600/5 dark:divide-white/5">
      <div className="grid grid-cols-2 font-semibold normal-text">
        <div>Nombre de usuario</div>
      </div>
      {loadingUsuarios || loadingUsuariosRoles || loadingRoles ? (
        <LoadingSkeleton />
      ) : errorUsuarios || errorUsuariosRoles || errorRoles ? (
        <div>Error cargando los datos</div>
      ) : (
        usuarios?.map((usuario) => (
          <Disclosure key={usuario.id} as="div" className="p-2">
            {({ open }) => (
              <>
                <div className="flex justify-between items-center">
                  <div className="grid grid-cols-2 w-full text-center">
                    <span className="text-base normal-text group-hover:text-gray-700">
                      {usuario.username}
                    </span>
                  </div>
                  <DisclosureButton className="p-1 min-w-48 rounded-md bg-emerald-500 text-white hover:bg-emerald-700 flex items-center text-center justify-center">
                    Roles de usuarios
                    <ChevronDownIcon
                      className={`h-5 w- ml-1 transition-transform ${
                        open ? "rotate-180 transform" : ""
                      }`}
                    />
                  </DisclosureButton>
                </div>
                <DisclosurePanel className="mt-2 text-sm text-gray-500">
                  Roles:
                  <TogglePanel
                    items={roles}
                    enabledItems={usuariosRolesState[usuario.id] || {}}
                    toggleItem={(roleId) => toggleRole(usuario.id, roleId)}
                  />
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        ))
      )}
    </div>
  );
};

export default UsuariosDisclosure;
