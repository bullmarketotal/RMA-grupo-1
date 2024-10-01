import React from "react";  
import './NavBar.css'

function NavBar() {
    return(
        <>
        <nav className="navbar">
        <div className="navbar-title">RED DE MONITOREO</div>
            <ul>
                <li><a className="navbar-link" href="#agregar-datos">Agregar Datos</a></li>
                <li><a className="navbar-link" href="#ver-datos">Ver Datos</a></li>
            </ul>
        </nav>
        </>
    )
}

export default NavBar

