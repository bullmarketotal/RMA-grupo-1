import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

const AddRoleForm = ({ onAddRole }) => {
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newRoleName && newRoleDesc) {
      onAddRole({ name: newRoleName, descripcion: newRoleDesc });
      setNewRoleName("");
      setNewRoleDesc("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mt-4">
      <input
        type="text"
        placeholder="Nombre del Rol"
        value={newRoleName}
        onChange={(e) => setNewRoleName(e.target.value)}
        className="input-text border-neutral-200 w-full max-w-xs mr-2"
      />
      <input
        type="text"
        placeholder="Descripción del Rol"
        value={newRoleDesc}
        onChange={(e) => setNewRoleDesc(e.target.value)}
        className="input input-text w-full max-w-xs"
      />
      <button
        type="submit"
        className="btn-active btn-action ml-2 flex items-center justify-center"
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    </form>
  );
};

export default AddRoleForm;
