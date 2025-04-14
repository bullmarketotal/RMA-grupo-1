import { Container, Header, LoadingSpinner } from "../components/atoms";
import ErrorSimple from "../components/molecules/ErrorSimple";
import CuencaCard from "../components/organisms/CuencaCard";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import {useCuencas} from "../hooks/useCuencas";
import CuencaInactivaCard from "../components/organisms/CuencaInactivaCard";
import { useCuencasInactivas } from "../hooks/useCuencasInactivas";

const CuencaList = () => {
  const { permisos } = useAuth();


  const { cuencas, loading, error, refresh } = useCuencas({ });

  const {
      cuencasInactivas,
      loading: loadingInactivas,
      error: errorInactivas,
      mutate,
    } =  useCuencasInactivas();
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
        {loadingInactivas ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-2">
            <>
            {cuencasInactivas.map((cuenca) => (
              <div className="mb-3" key={cuenca.id}>
                <CuencaInactivaCard
                  nodo={cuenca}
                  mutate={mutate}
                  refresh={refresh}
                />
              </div>
            ))}
            </>
        </div>
      )}
      {permisos.create_cuencas && (
        <div className="mb-3" >
          {/* Aquí podrías incluir un componente para crear cuencas si es necesario */}
        </div>
      )}
    </Container>
  );
};

export default CuencaList;
