import React from "react";
import { Link } from "react-router-dom"; 
import { Container, Header } from "../components/atoms"; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import BotonVolver from "../components/atoms/BotonVolver";

const ConfiguracionMenuPage = () => {
    
  return (
    <Container>
      <Header title="Menú de Configuración" />
      
      <div className="row">
        <div className="col-md-4 mb-12">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <div className="mb-3 text-primary" style={{ fontSize: "5.3em" }}>
                <i className="bi bi-gear"></i>
              </div>
              <h5 className="card-title">Configuración Global</h5>
              <Link to="/configuracion/general" className="btn btn-primary mt-3">
                Ir a Configuración
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-12">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <div className="mb-3 text-primary" style={{ fontSize: "5.3em" }}>
              <i class="bi bi-radar"></i>
              </div>
              <h5 className="card-title">Gestión Nodos?</h5>
              <Link to="/##########" className="btn btn-primary mt-3">
                Ir a Nodos
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <div className="mb-3 text-primary" style={{ fontSize: "5.3em" }}>
                <i className="bi bi-exclamation-circle"></i> 
              </div>
              <h5 className="card-title">Suscripcion a Alertas?</h5>
              <Link to="/###########" className="btn btn-primary mt-3">
                *
              </Link>
            </div>
          </div>
        </div>
  


  
      </div>

      <BotonVolver ruta="/" texto="Volver" />
      </Container>
  );
};

export default ConfiguracionMenuPage;
