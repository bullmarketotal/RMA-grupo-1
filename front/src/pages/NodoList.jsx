import { Container, Header, LoadingSpinner } from "../components/atoms";
import NodoCard from "../components/organisms/NodoCard";
import ErrorSimple from "../components/molecules/ErrorSimple";
import { useNodos, useNodosInactivos } from "../hooks";
import { useBreadcrumbsUpdater } from "../hooks";
import ExpandableCard from "../components/molecules/ExpandableCard";
import { NodoInactivoCard } from "../components/organisms";
const NodoList = () => {
  const { nodos, loading, error } = useNodos();
  useBreadcrumbsUpdater();
  const {
    nodosInactivos,
    loading: loadingInactivos,
    error: errorInactivos,
  } = useNodosInactivos();

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
          {nodosInactivos.map((nodo) => (
            <div className="mb-3" key={nodo.id}>
              <NodoInactivoCard nodo={nodo} />
            </div>
          ))}
        </>
      )}
      <div className="mb-3">
        <ExpandableCard />
      </div>
    </Container>
  );
};

export default NodoList;
