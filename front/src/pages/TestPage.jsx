import React from "react";
import { Container } from "../components/atoms";
import usePaqueteArchivo from "../hooks/usePaqueteArchivo";
import PageDatosArchivo from "./PageDatosArchivo.jsx";
const App = () => {
  const { data, pagination, loading, error, isForbidden } = usePaqueteArchivo({
    offset: 0,
    limit: 10,
  });

  if (loading) return <div>Loading...</div>;
  if (isForbidden) return <div>Access Forbidden</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <div>
        <h1>Lista de Paquetes Archivo</h1>
        <div>
          <strong>Total Items:</strong> {pagination.total_items}
          <br />
          <strong>Total Pages:</strong> {pagination.total_pages}
          <br />
          <strong>Current Page:</strong> {pagination.current_page}
          <br />
          <strong>Limit:</strong> {pagination.limit}
          <br />
          <strong>Offset:</strong> {pagination.offset}
        </div>
        {data.length === 0 ? (
          <div>No hay datos disponibles</div>
        ) : (
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                Nodo ID: {item.nodo_id}, Data: {item.data}, Date: {item.date},
                Type ID: {item.type_id}
              </li>
            ))}
          </ul>
        )}
      </div>
      <PageDatosArchivo />
    </Container>
  );
};

export default App;
