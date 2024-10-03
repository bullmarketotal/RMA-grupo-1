import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={`bg-dark text-white sidebar`}
      style={{
        width: "250px",
        height: "calc(100vh - 56px)", // 100% de la altura menos la altura del navbar
        position: "fixed",
        top: "56px",
        right: isOpen ? "0" : "-250px",
        transition: "right 0.8s",
      }}
    >
      <ul className="list-unstyled p-3">
        <li className="mb-2">
          <Link
            to="/crear-sensor" // Cambia esto a la ruta correcta
            className="text-white d-block p-2 rounded bg-secondary text-decoration-none"
            onClick={toggleSidebar}
          >
            Ver Sensores
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/consultar-datos" // Asegúrate de que esta ruta esté configurada
            className="text-white d-block p-2 rounded bg-secondary text-decoration-none"
            onClick={toggleSidebar}
          >
            Consultar Datos
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/sobre-nosotros" // Asegúrate de que esta ruta esté configurada
            className="text-white d-block p-2 rounded bg-secondary text-decoration-none"
            onClick={toggleSidebar}
          >
            Sobre Nosotros
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
