import { useState, useEffect } from "react";
import { useFetchNodoData, useNodos } from "../hooks";
import { Container, Header, LoadingSpinner } from "../components/atoms";
import { FiltroDatos } from "../components/molecules";
import { TableView } from "../components/organisms";
import DownloadCSVButton from "../components/atoms/DownloadCSVButton";

const DatosPage = () => {
  const [id, setId] = useState(1); // Estado para el ID del nodo seleccionado
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  /*const [tipos, setTipos] = useState([]); // Estado para los tipos de datos */
  /*const [selectedTipo, setSelectedTipo] = useState("");  Estado para el tipo de dato seleccionado */
  
  // Parámetros para la búsqueda de datos (params no necesita useState)
  const params = {
    offset: 0,
    limit: 10,
    nodo_id: id || 1,
    filterStartDate: startDate || "",
    filterEndDate: endDate || "",
    orden: "asc",
    type: 1
  };

  // Obtención de datos del nodo con hook useFetchNodoData
  const { data, loading, error, mutate, isForbidden } = useFetchNodoData(params);

  // Obtención de nodos con useNodos
  const { nodos, loading: loadingSensores, error: errorSensores } = useNodos();

  console.log(nodos); // Verificar que los nodos estén llegando correctamente

  // Manejo de error y carga
  if (error) {
    return <p>Hubo un problema al cargar los datos. Intenta nuevamente más tarde.</p>;
  }

  if (loadingSensores) return <LoadingSpinner />; // Mostrar spinner mientras se cargan los nodos


//Filtro de fechas
const handleFilterChange = (newStartDate, newEndDate) => {
  // Guardamos las fechas anteriores en caso de que necesitemos restaurarlas
  const previousStartDate = startDate;
  const previousEndDate = endDate;

  // Verificamos si la fecha de inicio es posterior a la fecha de fin
  if (newStartDate && newEndDate && new Date(newStartDate) > new Date(newEndDate)) {
    // Mostramos un mensaje de alerta y restauramos las fechas anteriores
    alert('La fecha de inicio no puede ser posterior a la fecha de fin.');
    setStartDate(previousStartDate);
    setEndDate(previousEndDate);
    return;
  }

  // Si las fechas son válidas, actualizamos el estado
  setStartDate(newStartDate);
  setEndDate(newEndDate);
};

console.log(data);
  
  return (
    <Container>
      <Header title={"Datos de Nodos"} />
      <div className="card-body">
        {/* Verifica si hay error en la carga de nodos */}
        {errorSensores ? (
          <p>{errorSensores}</p>
        ) : (
          <div className="mb-6">
            <label className="form-label me-2 mb-1">
              <strong>Seleccionar ID de Sensor</strong>
            </label>
            <select
              id="sensorId"
              className="form-select"
              value={id}
              onChange={(e) => setId(e.target.value)}
            >
              {/* Si no hay nodos, mostrar un mensaje por defecto */}
              {nodos.length === 0 ? (
                <option value="">No hay nodos disponibles</option>
              ) : (
                nodos.map((nodo) => (
                  <option key={nodo.id} value={nodo.id}>
                    {`${nodo.id} - ${nodo.identificador}`}
                  </option>
                ))
              )}
            </select>
          </div>
        )}
{/*
        
        <div className="mb-6">
          <label className="form-label me-2 mb-1">
            <strong>Seleccionar Tipo de Dato</strong>
          </label>
          <select
            id="tipoDato"
            className="form-select"
            value={selectedTipo}
            onChange={(e) => setSelectedTipo(e.target.value)}
          >
            <option value="">Selecciona un tipo de dato</option>
            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>
*/}
        <div className="flex items-center">
          <FiltroDatos onFilterChange={handleFilterChange} className="px-2" />

          {/* Botón para descargar CSV */}
          <div className="px-2">
            <DownloadCSVButton data={data || []} disabled={loading} />
          </div>
        </div>

        {/* Mostrar los datos de la tabla */}
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