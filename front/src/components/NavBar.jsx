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


