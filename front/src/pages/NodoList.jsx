import { Container, Header, LoadingSpinner } from "../components/atoms";
import NodoCard from "../components/organisms/NodoCard";
import ErrorSimple from "../components/molecules/ErrorSimple";
import { useNodos, useNodosInactivos } from "../hooks";
import { useBreadcrumbsUpdater } from "../hooks";
import ExpandableCard from "../components/molecules/ExpandableCard";
import { NodoInactivoCard } from "../components/organisms";
import { useAuth } from "../context/AuthProvider";
import { useSearchParams } from "react-router-dom";
import CuencaCard from "../components/organisms/CuencaCard";

const NodoList = (cuenca) => {
  const { permisos } = useAuth();
  const cuencaId = cuenca.cuenca.id|| null; 
  const nombreCuenca = cuenca.cuenca.nombre
  

  const { nodos, loading, error, refresh } = useNodos({ cuenca_id: cuencaId });
  useBreadcrumbsUpdater();

  const {
    nodosInactivos,
    loading: loadingInactivos,
    error: errorInactivos,
    mutate,
  } = permisos.read_nodos_inactivos
    ? useNodosInactivos({ cuenca_id: cuencaId })
    : { nodosInactivos: [], loading: false, error: null };

  if (error)
    return (
      <ErrorSimple
        title={"No se pudieron obtener los nodos"}
        description={"Error interno del servidor."}
      />
    );

  return (
    <div >
      <Header title={`Lista de Nodos de ${nombreCuenca}`} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {nodos.map((nodo) => (
            <div className="mb-3" key={nodo.id}>
              <NodoCard nodo={nodo} cuencaId={cuencaId} />
            </div>
          ))}
        </>
      )}

      {loadingInactivos ? (
        <LoadingSpinner />
      ) : (
        <>
          {permisos.read_nodos_inactivos && (
            <>
              {nodosInactivos.map((nodo) => (
                <div className="mb-3" key={nodo.id}>
                  <NodoInactivoCard
                    nodo={nodo} 
                    mutate={mutate}
                    refresh={refresh}
                  />
                </div>
              ))}
            </>
          )}
        </>
      )}

      {permisos.create_nodos && (
        <div className="mb-3">
          <ExpandableCard cuencaId= {cuencaId}/>
        </div>
      )}
    </div>
  );
};

export default NodoList;