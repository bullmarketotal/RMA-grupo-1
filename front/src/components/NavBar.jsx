import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./NavBar.css";

const NavLink = ({ to, children }) => (
  <Nav.Link as={Link} to={to} className="nav-link">
    {children}
  </Nav.Link>
);

function NavBar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const logo = "/logo-recortado.png";

  return (
    <Navbar
      bg="primary"
      data-bs-theme="dark"
      expand="lg"
      style={{ position: "sticky", top: 0, zIndex: 1000 }}
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        <Navbar.Brand as={Link} to="/" className="navbar-title">
          <img
            src={logo}
            alt="Logo"
            style={{ width: 180, height: 60, marginRight: "10px" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/create-sensor">Crear Sensor</NavLink>
            {isAuthenticated && <NavLink to="/list-sensor">Sensores</NavLink>}
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
  );
}

export default NavBar;
