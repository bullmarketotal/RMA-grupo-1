import React from "react";
import { useUsuarios } from "../hooks/useUsuarios";

const UsuariosComponent = () => {
  const { data, error, isValidating, mutate } = useUsuarios();

  if (isValidating) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos.</p>;

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {data.map((usuario) => (
          <li key={usuario.id}>
            {usuario.id} {usuario.username}
          </li>
        ))}
      </ul>
      <button onClick={console.log(data)}>Refrescar Datos</button>
    </div>
  );
};

export default UsuariosComponent;
