import React from "react";
import { MdOutlineSettingsInputAntenna } from "react-icons/md";
import { LinkComponent } from "../atoms";

const CuencaCard = ({ cuenca }) => {
  const breadcrumbPath = [
    { label: "Home", path: "/" },
    { label: "Lista de Cuencas", path: "/lista-cuencas" },
    { label: `Cuenca ${cuenca.id}`, path: `/cuenca/${cuenca.id}` },
  ];
  return (
    <div className="roboto border-2 rounded-2xl p-3 dark:border-neutral-800 dark:text-neutral-50">
      <div className="flex flex-col">
        <h4 className="card-title flex items-center text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 font-semibold">
          <MdOutlineSettingsInputAntenna className="mr-2" />
           {cuenca.nombre}
        </h4>
        <p className="normal-text text-sm py-2 mb-1">{cuenca.descripcion}</p>
        <span className="text-xs sm:text-sm text-neutral-600">
          <b>Nodos en la cuenca:</b> {cuenca.nodos.length}
        </span>

        <div className="mt-4">
          <LinkComponent
              to={`/cuenca/${cuenca.id}`}
              breadcrumbPath={breadcrumbPath}
              className="roboto-medium bg-gray-300 hover:bg-gray-400 dark:hover:bg-slate-900 text-gray-800 font-bold py-2 px-4 rounded-2xl transition-all duration-100 dark:bg-slate-800 dark:text-slate-200"
          >
            VER CUENCA
          </LinkComponent>
        </div>
      </div>
    </div>
  );
};

export default CuencaCard;

