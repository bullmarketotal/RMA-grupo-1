import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LogoutConfirmationPage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark-bg normal-text">
      <div className="normal-bg p-6 rounded-lg shadow-md text-center">
        <h2 className="normal-text text-lg font-semibold mb-4">
          ¿Deseas cerrar sesión?
        </h2>
        <p className="normal-text mb-6">
          Tu sesión se cerrará y volverás a la página de inicio de sesión.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleConfirmLogout}
            className="px-4 py-2 btn-action btn-active rounded-lg"
          >
            Confirmar
          </button>
          <button
            onClick={handleCancel}
            className="normal-text px-4 py-2 bg-neutral-300 dark:bg-neutral-500 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationPage;
