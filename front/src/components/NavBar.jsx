<<<<<<< HEAD
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
=======
import React from "react";  
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom'; 
import "./NavBar.css"

function NavBar() {

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">RED DE MONITOREO</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/create-sensor">Crear Sensor</Nav.Link>
            <Nav.Link as={Link} to="/list-sensor">Sensores</Nav.Link>
            <Nav.Link as={Link} to="/tabla-datos">Datos</Nav.Link>
            <Nav.Link as={Link} to="/graficos">Gráficos</Nav.Link> {/* Corregido el texto de "Graficos" */}
          </Nav>
        </Container>
      </Navbar>

      <section>
        <Outlet /> 
      </section>
    </>
  );
}

export default NavBar;

>>>>>>> b5f475a320a6d287d58f0d981a1d1102f41c8364

