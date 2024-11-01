import { useState, useEffect } from "react";

const useCustomHook = (param1, param2) => {
  const [data, setData] = useState(null); //Cuando busco algo

  const [loading, setLoading] = useState(true); // estado de carga
  //Utilidad if (loading) return <LoadingSpinner />;

  const [error, setError] = useState(null); // estado de error
  //Utilidad if (error) return <div>Error: {error}</div>;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        /**
         * Inicia la logica
         */
        const response = await fetch(`API_ENDPOINT/${param1}/${param2}`);

        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        const result = await response.json();
        setData(result);
        /**
         * Termina la logica
         */
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    //Dependencias que activan el useEffect
  }, [param1, param2]);
  // como lo utilizo en el componente:
  // const [param1Value, setFilterValue] = useState("initialFilter"); // Estado para el filtro
  // const [param2Value, setSortOrder] = useState("asc"); // Estado para el orden de clasificación

  // Retornar los valores y funciones necesarios
  return { data, loading, error };
  // como lo utilizaría el componente:
  //const { data, loading, error } = useTemplate('param1Value', 'param2Value');
};

export default useCustomHook;
