import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Header, LoadingSpinner } from "../components/atoms";
import NodoCard from "../components/organisms/NodoCard";
import ErrorSimple from "../components/molecules/ErrorSimple";
import { useNodos } from "../hooks/useNodos";

const NodoList = () => {
  const { nodos, loading, error } = useNodos();
  
  if (error) return <ErrorSimple title={"No se pudieron obtener los nodos"} description={"Error interno del servidor."}/>

  return (
    <Container>
      <Header title={"Lista de Nodos"} />
      <div className="card-body">
        {loading ? (
          <LoadingSpinner />
        ) : (
          nodos.map((nodo) => (
            <div className="mb-3" key={nodo.id}>
              <NodoCard nodo={nodo} />
            </div>
          ))
        )}
      </div>
    </Container>
  );
};

export default NodoList;
