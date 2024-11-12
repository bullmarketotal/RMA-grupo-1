import "bootstrap/dist/css/bootstrap.min.css";
import useFetchSensores from "../hooks/useFetchSensores";
import { Container, Header, LoadingSpinner } from "../components/atoms";
import NodoCard from "../components/organisms/NodoCard";
import ErrorSimple from "../components/molecules/ErrorSimple";

const NodoList = () => {
  const { data, loading, error } = useFetchSensores();
  if (error) return <ErrorSimple title={"No se pudieron obtener los nodos"} description={"Error interno del servidor."}/>

  return (
    <Container>
      <Header title={"Lista de Nodos"} />
      <div className="card-body">
        {loading ? (
          <LoadingSpinner />
        ) : (
          data.map((sensor) => (
            <div className="mb-3" key={sensor.id}>
              <NodoCard sensor={sensor} />
            </div>
          ))
        )}
      </div>
    </Container>
  );
};

export default NodoList;
