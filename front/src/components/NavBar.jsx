import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Outlet } from "react-router-dom";
import "./NavBar.css";


function NavBar() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" expand="lg">
        <Container fluid className="d-flex justify-content-between align-items-center">
          <Navbar.Brand className="navbar-title" as={Link} to="/">
            RED DE MONITOREO
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="nav-link">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/create-sensor" className="nav-link">
                Crear Sensor
              </Nav.Link>
              <Nav.Link as={Link} to="/list-sensor" className="nav-link">
                Sensores
              </Nav.Link>
              <Nav.Link as={Link} to="/tabla-datos" className="nav-link">
                Datos
              </Nav.Link>
              <Nav.Link as={Link} to="/graficos" className="nav-link">
                Gráficos
              </Nav.Link>
              </Nav>
              <Nav>
                <Button variant="outline-light">Iniciar Sesión</Button>
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section>
        <Outlet />
      </section>
    </>
  );
}

export default NavBar;