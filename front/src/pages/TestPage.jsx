import { React, useState } from "react";
import api from "../api/axios";
import { Container } from "../components/atoms";
import RoleList from "./RoleList";
import AsignarPermiso from "./AsignarPermiso";
import AsignarRol from "./AsignarUsuario";

const accessToken = localStorage.getItem("access_token");
try {
  const response = await api.get("/roles_seguros", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(response.data);
} catch (error) {
  console.error("Error al obtener datos protegidos:", error);
}

export default function Example() {
  const handleEditRole = (role) => {
    setSelectedRole(role);
    setIsRoleFormOpen(true);
  };

  const handleDeleteRole = (id) => {
    console.log("Eliminar Rol", id);
  };

  return (
    <Container>
      <div className="container mx-auto p-6 justify-center">
        <h1 className="text-2xl font-semibold mb-6">
          Gestión de Permisos y Roles
        </h1>

        {/* Lista de Roles */}
        <div className="justify-center mb-6">
          <h2 className="text-xl font-semibold mb-4">Roles</h2>
          <RoleList onEdit={handleEditRole} onDelete={handleDeleteRole} />
        </div>
      </div>

      <AsignarPermiso />
      <AsignarRol />
    </Container>
  );
}
