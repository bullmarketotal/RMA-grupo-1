import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./NavBar.css";

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const logo = "/logo-recortado.png";

  return (
    <>
      <Navbar
        bg="primary"
        data-bs-theme="dark"
        expand="lg"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          height: "70px",
        }}
      >
        <Container
          fluid
          className="d-flex justify-content-between align-items-center"
          style={{ maxWidth: "1400px", margin: "0 auto" }}
        >
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              alt="Logo"
              style={{ width: 180, height: 60, marginRight: "10px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/create-sensor">
                Crear Nodo
              </Nav.Link>
              <Nav.Link as={Link} to="/list-sensor">
                Nodos
              </Nav.Link>
              <Nav.Link as={Link} to="/datos-view">
                Datos
              </Nav.Link>
            </Nav>
            <Nav>
              {isAuthenticated ? (
                <Button
                  variant="outline-light"
                  onClick={logout}
                  className="mx-2"
                >
                  Cerrar Sesión
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="outline-light" className="mx-2">
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="content-container">
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
