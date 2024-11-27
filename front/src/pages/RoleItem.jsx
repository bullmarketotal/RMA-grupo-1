import React, { useState } from "react";
import {
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
  KeyIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import TogglePanel from "./TogglePanel";
import ConfirmationPopover from "../components/atoms/ConfirmationPopover";

const RoleItem = ({
  role,
  permisos,
  rolesPermisos,
  togglePermiso,
  handleEdit,
  handleDelete,
  handleSaveEdit,
  handleCancelEdit,
  isEditing,
  newRoleName,
  newRoleDesc,
  setNewRoleName,
  setNewRoleDesc,
}) => {
  return (
    <Disclosure as="div" className="p-2">
      {({ open }) => (
        <>
          <div className="flex justify-between items-center">
            {isEditing ? (
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
                  className="btn btn-action text-neutral-50 bg-emerald-500 ml-2"
                >
                  <CheckIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="btn btn-alert ml-2"
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
          <DisclosurePanel className="mt-2 text-sm text-gray-500">
            <TogglePanel
              items={permisos}
              enabledItems={rolesPermisos[role.id] || {}}
              toggleItem={(permisoId) => togglePermiso(role.id, permisoId)}
            />
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default RoleItem;
