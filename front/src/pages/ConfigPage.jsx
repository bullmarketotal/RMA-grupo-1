import React from "react";
import ConfigFormList from "../components/organisms/ConfigFormList";
import { Container, Header } from "../components/atoms";

const ConfigPage = () => {
  return (
    <Container>
      <Header title="Configuración Global" />
      
      <div className="mb-3">
        <h3 className="h5 text-muted">Configuración de umbrales</h3>
      </div>
      
      <ConfigFormList />
    </Container>
  );
};

export default ConfigPage;
