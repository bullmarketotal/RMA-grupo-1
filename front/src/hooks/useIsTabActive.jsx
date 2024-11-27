import { useState, useEffect } from "react"

export const useIsTabActive = () => {
    const [isTabActive, setIsTabActive] = useState(true);
    useEffect(() => {

        // Función para manejar el cambio de visibilidad de la pestaña
        const handleVisibilityChange = () => {
          setIsTabActive(!document.hidden);
        };
    
        // Agregar el listener al montar
        document.addEventListener("visibilitychange", handleVisibilityChange);
    
        return () => {
          // Limpiar el listener al desmontar
          document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
      }, []);

      return isTabActive
}