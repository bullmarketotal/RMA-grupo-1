import { Container, Header, LoadingSpinner } from "../components/atoms";
import ErrorSimple from "../components/molecules/ErrorSimple";
import CuencaCard from "../components/organisms/CuencaCard";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

const CuencaList = () => {
  const { permisos } = useAuth();
  const [cuencas, setCuencas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCuencas = async () => {
      try {
        const response = await fetch("http://localhost:8000/cuencas");
        if (!response.ok) {
          throw new Error("Error al obtener las cuencas");
        }
        const cuencasData = await response.json();
        setCuencas(cuencasData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
      console.log("CUENCANODOS",cuencas);
    };

    fetchCuencas();

  }, []);

  if (error) {
    return (
      <ErrorSimple
        title={"No se pudieron obtener las cuencas"}
        description={error}
      />
    );
  }

  return (
    <Container>
      <Header title={"Lista de Cuencas"} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {cuencas.length === 0 ? (
            <p>No hay cuencas disponibles.</p>
          ) : (
            cuencas.map((cuenca) => <CuencaCard key={cuenca.id} cuenca={cuenca} />)
          )}
        </>
      )}

      {permisos.create_cuencas && (
        <div className="mb-3">
          {/* Aquí podrías incluir un componente para crear cuencas si es necesario */}
        </div>
      )}
    </Container>
  );
};

export default CuencaList;
