import "bootstrap/dist/css/bootstrap.min.css";
import useFetchSensores from "../hooks/useFetchSensores";
import { Container, Header, LoadingSpinner } from "../components/atoms";
import { SensorCard } from "../components/organisms";

const SensorList = () => {
  const { data, loading, error } = useFetchSensores();
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Header title={"Lista de Nodos"} />
      <div className="card-body">
        {loading ? (
          <LoadingSpinner />
        ) : (
          data.map((sensor) => (
            <div className="mb-3" key={sensor.id}>
              <SensorCard sensor={sensor} />
            </div>
          ))
        )}
      </div>
    </Container>
  );
};

export default SensorList;
