import { Container, Header, LoadingSpinner } from "../components/atoms";
import NodoCard from "../components/organisms/NodoCard";
import ErrorSimple from "../components/molecules/ErrorSimple";
import { useNodos, useNodosInactivos } from "../hooks";
import { useBreadcrumbsUpdater } from "../hooks";
import ExpandableCard from "../components/molecules/ExpandableCard";
import { NodoInactivoCard } from "../components/organisms";
import { useAuth } from "../context/AuthProvider";

const NodoList = () => {
  const { permisos } = useAuth();

  const { nodos, loading, error, refresh } = useNodos();
  useBreadcrumbsUpdater();

  const {
    nodosInactivos,
    loading: loadingInactivos,
    error: errorInactivos,
    mutate,
  } = permisos.read_nodos_inactivos
    ? useNodosInactivos()
    : { nodosInactivos: [], loading: false, error: null };

  console.log(permisos);
  if (error)
    return (
      <ErrorSimple
        title={"No se pudieron obtener los nodos"}
        description={"Error interno del servidor."}
      />
    );

  return (
    <Container>
      <Header title={"Lista de Nodos"} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {nodos.map((nodo) => (
            <div className="mb-3" key={nodo.id}>
              <NodoCard nodo={nodo} />
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
          <ExpandableCard />
        </div>
      )}
    </Container>
  );
};

export default NodoList;
