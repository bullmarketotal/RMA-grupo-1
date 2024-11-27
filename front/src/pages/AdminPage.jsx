import React, { Component } from "react";
import RolesDisclosure from "../components/organisms/RolesDisclosure";
import { Container, Header } from "../components/atoms";
import UsersDisclosure from "../components/organisms/UsersDisclosure";
class AdminPage extends Component {
  render() {
    return (
      <Container>
        <Header title={"Gestionar permisos y roles"} />
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-medium mb-2">Roles y Permisos</h2>
            <RolesDisclosure />
          </div>
          <div>
            <h2 className="text-2xl font-medium mb-2">Usuarios y Roles</h2>
            <UsersDisclosure />
          </div>
        </div>
      </Container>
    );
  }
}

export default AdminPage;
