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
    <>
      <PageDatosArchivo />
    </>
  );
};

export default App;
