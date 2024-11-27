import { Container, Header, LoadingSpinner } from "../components/atoms";
import NodoCard from "../components/organisms/NodoCard";
import ErrorSimple from "../components/molecules/ErrorSimple";
import { useNodos, useNodosInactivos } from "../hooks";
import { useBreadcrumbsUpdater } from "../hooks";
import ExpandableCard from "../components/molecules/ExpandableCard";
import { NodoInactivoCard } from "../components/organisms";
import { useAuth } from "../context/AuthProvider";

const NodoList = () => {
  const { nodos, loading, error } = useNodos();
  const { permisos } = useAuth();
  useBreadcrumbsUpdater();
  const {
    nodosInactivos,
    loading: loadingInactivos,
    error: errorInactivos,
  } = useNodosInactivos();
  console.log(permisos);
  if (error)
    return (
      <ErrorSimple
        title={"No se pudieron obtener los nodos"}
        description={"Error interno del servidor."}
      />
    );
  if (errorInactivos)
    return (
      <ErrorSimple
        title={"No se pudieron obtener los nodos inactivos"}
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
                  <NodoInactivoCard nodo={nodo} />
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
