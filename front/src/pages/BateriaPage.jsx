import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BateriaHeader from "../components/molecules/BateriaHeader";
import BateriaInfoPanel from "../components/molecules/BateriaInfoPanel";
import BateriaDataVisualizer from "../components/organisms/BateriaDataVisualizer";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import useFetchSensorData from "../hooks/useFetchSensorData";
import { Container, Header } from "../components/atoms";
import { useNavigate } from "react-router-dom";


const BateriaPage = () => {
  const id  = 1
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { data, loading, error } = useFetchSensorData(id, startDate, endDate);
  const navigate = useNavigate();

  const handleFilterChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  function volverAlSensor(){
    navigate("/sensor/1");
  }

  return (

    <Container>
 
      <div id="main">
        <div className="card-body">
          <BateriaHeader sensor={data.sensor} loading={loading} />
          <BateriaInfoPanel data={data} loading={loading} />
        </div>
      </div>
      <BateriaDataVisualizer
        data={data}
        loading={loading}
        onFilterChange={handleFilterChange}
      />

<div className="card-body d-flex justify-content-between">
  <div className="col-lg-12 col-sm-12">
    <div className="card mb-30">
      <div className="card-body">
        <div className="col-sm text-center">
          {/* Este es el nuevo diseño con la estructura y clases de Bootstrap del segundo botón */}
          <button
            id="btn-volver-atras"
            className="btn btn-primary"
            onClick={volverAlSensor}
          >
           
            Volver al Nodo
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

    </Container>
  );
};

export default BateriaPage;
