import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { useBreadcrumbs } from "../context/BreadcrumbsContext";

const useBreadcrumbsUpdater = () => {
  const { setBreadcrumbs } = useBreadcrumbs();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/lista-nodos") {
      setBreadcrumbs([
        {
          label: (
            <span className="flex items-center font-semibold">
              <GrHomeRounded className="mr-1" /> Home
            </span>
          ),
          path: "/",
        },
        { label: "Lista de Nodos", path: "/lista-nodos" },
      ]);
    }
    if (location.pathname === "/") {
      setBreadcrumbs([
        {
          label: (
            <span className="flex items-center">
              <GrHomeRounded className="mr-1" /> Home
            </span>
          ),
          path: "/",
        },
      ]);
    }
  }, [location, setBreadcrumbs]);
};

export default useBreadcrumbsUpdater;
