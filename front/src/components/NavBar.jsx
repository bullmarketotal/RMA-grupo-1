import React from "react";
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar({ toggleSidebar }) {
    return (
        
        <nav className="navbar navbar-expand-lg navbar-light bg-success"
        style={{ 
            position: 'fixed', 
            width: '100%', 
            top: 0, 
        }}
        >
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="#">RED DE MONITOREO</a>
                
                <button 
                    className="navbar-toggler d-block" 
                    type="button" 
                    onClick={toggleSidebar} 
                    aria-controls="navbarNav" 
                    aria-expanded={true} 
                    aria-label="Toggle navigation"
                    >
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    );
}

export default NavBar;
const NavConteiner = styled.nav

