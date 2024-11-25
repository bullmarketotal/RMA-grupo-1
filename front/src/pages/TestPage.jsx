import React from "react";
import UsersDisclosure from "./UsersDisclosure";
import RolesDisclosure from "./RolesDisclosure";
import { Container } from "../components/atoms";
import TestFetchNodoData from "./TestFetchNodoData";

const users = [
  { id: 1, username: "Usuario1" },
  { id: 2, username: "Usuario2" },
  { id: 3, username: "Usuario3" },
];
const roles = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Editor" },
  { id: 3, name: "Viewer" },
];
const permisos = [
  { id: 1, name: "Permiso 1" },
  { id: 2, name: "Permiso 2" },
  { id: 3, name: "Permiso 3" },
];
const App = () => {
  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Roles y Permisos</h2>
          <RolesDisclosure roles={roles} permisos={permisos} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Usuarios y Roles</h2>
          <UsersDisclosure users={users} roles={roles} />
        </div>
      </div>
      <TestFetchNodoData />
    </Container>
  );
};
export default App;
