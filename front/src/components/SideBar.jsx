import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <div 
            className={`bg-dark text-white sidebar`} 
            style={{ 
                width: '250px', 
                height: 'calc(100vh - 56px)', 
                position: 'fixed', 
                top: '56px',
                right: isOpen ? '0' : '-250px', 
                transition: 'right 0.8s' 
            }}
        >
            <ul className="list-unstyled p-3">
                <li className="mb-2">
                    <Link 
                        to="/crear-sensor" 
                        className="text-white d-block p-2 rounded bg-secondary text-decoration-none"
                        onClick={toggleSidebar}
                    >
                        Ver Sensores
                    </Link>
                </li>
                <li className="mb-2">
                    <Link 
                        to="/consultar-datos" 
                        className="text-white d-block p-2 rounded bg-secondary text-decoration-none"
                        onClick={toggleSidebar}
                    >
                        Consultar Datos
                    </Link>
                </li>
                <li className="mb-2">
                    <Link 
                        to="/sobre-nosotros" 
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
