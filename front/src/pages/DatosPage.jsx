import { useState } from "react";
import { useFetchNodoData, useNodos } from "../hooks";
import { Container, Header, LoadingSpinner } from "../components/atoms";
import { FiltroDatos } from "../components/molecules";
import { TableView } from "../components/organisms";
import DownloadCSVButton from "../components/atoms/DownloadCSVButton";

const DatosPage = () => {
  const [id, setId] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const { data, loading, error } = useFetchNodoData({
    offset: 0,
    limit: 5, 
    nodo_id: id || "", 
    filterStartDate: startDate || "",
    filterEndDate: endDate || "",
    orden: "asc",
    type: 25,
  });

  console.log(data);
  
  const nodos = [
    { id: 1, nombre: "Elemento A", tipo: "tipo1" },
    { id: 2, nombre: "Elemento B", tipo: "tipo2" },
    { id: 3, nombre: "Elemento C", tipo: "tipo3" },
    { id: 4, nombre: "Elemento D", tipo: "tipo1" },
    { id: 5, nombre: "Elemento E", tipo: "tipo2" },
  ];

  const {
    loading: loadingSensores,
    error: errorSensores,
  } = useNodos({
    enableAdd: true,
    enableUpdate: true,
    enableDelete: true,
  });

  console.log(nodos);

  if (error) return null;
  const handleFilterChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };
  return (
    <Container>
      <Header title={"Datos de Nodos"} />
      <div className="card-body">
        {loadingSensores ? (
          <LoadingSpinner />
        ) : errorSensores ? (
          <p>{errorSensores}</p>
        ) : (
          <div className="mb-3">
            <label className="form-label me-2 mb-0">
              <strong>Seleccionar ID de Sensor</strong>
            </label>
            <select
              id="sensorId"
              className="form-select"
              value={id}
              onChange={(e) => setId(e.target.value)}
            >
              {nodos.map((nodo) => (
                <option key={nodo.id} value={nodo.id}>
                  {`${nodo.id} - ${nodo.identificador}`}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex items-center">
          <FiltroDatos onFilterChange={handleFilterChange} className="px-2" />

          {/* Botón para descargar CSV */}
          <div className="px-2">
            <DownloadCSVButton data={data || []} disabled={loading} />
          </div>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <TableView data={data} loading={loading} />
        )}
      </div>
    </Container>
  );
};

export default DatosPage;
