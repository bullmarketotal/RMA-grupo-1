import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SensorHeader from "../components/molecules/SensorHeader";
import SensorInfoPanel from "../components/molecules/SensorInfoPanel";
import SensorDataVisualizer from "../components/molecules/SensorDataVisualizer";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import useFetchSensorData from "../hooks/useFetchSensorData";
import { Container, Header } from "../components/atoms";

const SensorPage = () => {
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
          <SensorHeader sensor={data.sensor} loading={loading} />
          <SensorInfoPanel data={data} loading={loading} />
        </div>
      </div>
      <SensorDataVisualizer
        data={data}
        loading={loading}
        onFilterChange={handleFilterChange}
      />
    </Container>
  );
};

export default SensorPage;
