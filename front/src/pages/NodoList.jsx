import { Container, Header, LoadingSpinner } from "../components/atoms";
import NodoCard from "../components/organisms/NodoCard";
import ErrorSimple from "../components/molecules/ErrorSimple";
import { useNodos } from "../hooks/useNodos";
import { useBreadcrumbsUpdater } from "../hooks";
import ExpandableCard from "../components/molecules/ExpandableCard"; // Importar el componente

const NodoList = () => {
  const { nodos, loading, error } = useNodos();
  useBreadcrumbsUpdater();

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
          <div className="mb-3">
            <ExpandableCard />
          </div>
        </>
      )}
    </Container>
  );
};

export default NodoList;
