import React, { useState } from "react";
import Modal from "../components/atoms/Modal";

const AssignPermissions = ({ isOpen, onClose, permissions, onSubmit }) => {
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handleCheckboxChange = (permisoId) => {
    setSelectedPermissions((prevSelected) =>
      prevSelected.includes(permisoId)
        ? prevSelected.filter((id) => id !== permisoId)
        : [...prevSelected, permisoId]
    );
  };

  const handleSubmit = () => {
    onSubmit({
      role_id: selectedPermissions[0],
      permiso_ids: selectedPermissions,
    });
    setSelectedPermissions([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Asignar Permisos</h2>
      <div className="max-h-60 overflow-y-auto">
        {permissions.map((permiso) => (
          <div key={permiso.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`permiso-${permiso.id}`}
              checked={selectedPermissions.includes(permiso.id)}
              onChange={() => handleCheckboxChange(permiso.id)}
              className="mr-2"
            />
            <label htmlFor={`permiso-${permiso.id}`}>
              {permiso.identificador}
            </label>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="bg-sky-500 text-white px-4 py-2 rounded-md"
        >
          Guardar
        </button>
      </div>
    </Modal>
  );
};

export default AssignPermissions;
