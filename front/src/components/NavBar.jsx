import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./NavBar.css";

function NavBar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" expand="lg">
        <Container
          fluid
          className="d-flex justify-content-between align-items-center"
        >
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

              {/* Ver sensores al estar autenticado */}
              <Nav.Link
                as={Link}
                to="/list-sensor"
                className="nav-link"
                style={{ display: isAuthenticated ? "block" : "none" }}
              >
                Sensores
              </Nav.Link>

              <Nav.Link as={Link} to="/tabla-datos" className="nav-link">
                Datos
              </Nav.Link>
            </Nav>

            <Nav>
              {isAuthenticated ? (
                <Button
                  variant="outline-light"
                  className="ms-2 mb-2"
                  onClick={logout}
                >
                  Cerrar Sesión
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="outline-light" className="ms-2 mb-2">
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
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
