import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Header, LoadingSpinner } from "../components/atoms";
import { NodoDataVisualizer, NodoInfo } from "../components/organisms";
import { useFetchSensorData } from "../hooks";

const NodoPage = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { data, loading, error } = useFetchSensorData(id, startDate, endDate);

  const handleFilterChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Header title={"Nodo"} />
      <div id="main">
        <div className="card-body">
          <NodoInfo data={data} loading={loading} />
          {/* <SensorHeader sensor={data.sensor} loading={loading} />
          <SensorInfoPanel data={data} loading={loading} /> */}
        </div>
      </div>
      <NodoDataVisualizer
        data={data}
        loading={loading}
        onFilterChange={handleFilterChange}
      />
    </Container>
  );
};

export default NodoPage;
