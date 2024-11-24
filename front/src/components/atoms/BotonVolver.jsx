import React from "react";
import { Link } from "react-router-dom";

const BotonVolver = ({ ruta, texto = "Volver" }) => {
  return (
    <div className="col-lg-12 col-sm-12">
      <div className="card mb-30">
        <div className="card-body text-center">
          <Link to={ruta} className="btn btn-primary m-1">
            {texto}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BotonVolver
