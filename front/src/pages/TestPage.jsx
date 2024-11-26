import React from "react";
import UsersDisclosure from "./UsersDisclosure";
import RolesDisclosure from "./RolesDisclosure";
import { Container } from "../components/atoms";
const App = () => {
  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Roles y Permisos</h2>
          <RolesDisclosure />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Usuarios y Roles</h2>
          <UsersDisclosure />
        </div>
      </div>
    </Container>
  );
};
export default App;
