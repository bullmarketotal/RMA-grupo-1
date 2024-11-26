import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useBreadcrumbs } from "../context/BreadcrumbsContext";

const useBreadcrumbsUpdater = () => {
  const { setBreadcrumbs } = useBreadcrumbs();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/lista-nodos") {
      setBreadcrumbs([
        {
          label: "Home",
          path: "/",
        },
        { label: "Lista de Nodos", path: "/lista-nodos" },
      ]);
    }
    if (location.pathname === "/") {
      setBreadcrumbs([
        {
          label: "Home",
          path: "/",
        },
      ]);
    }
  }, [location, setBreadcrumbs]);
};

export default useBreadcrumbsUpdater;
