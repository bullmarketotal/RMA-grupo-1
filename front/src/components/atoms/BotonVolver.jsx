import React from "react";
import { Link } from "react-router-dom";

const BotonVolver = ({ ruta, texto = "Volver" }) => {
  return (
    <div className="col-lg-12 col-sm-12 ">
      <div className="mb-30">
        <div className="py-3 text-center ">
          <Link to={ruta} className="roboto-medium mt-16 bg-gray-300 hover:bg-gray-400 dark:hover:bg-slate-900 text-gray-800 font-bold py-2 px-4 rounded-2xl transition-all duration-100 dark:bg-slate-800 dark:text-slate-200">
            {texto}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BotonVolver
