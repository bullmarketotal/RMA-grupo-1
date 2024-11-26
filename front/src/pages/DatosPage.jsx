import { useState, useEffect } from "react";
import { useFetchNodoData, useNodos, useTipoDato } from "../hooks"; // Asegúrate de importar useTipos
import { Container, Header, LoadingSpinner } from "../components/atoms";
import { FiltroDatos } from "../components/molecules";
import { TableView } from "../components/organisms";
import DownloadCSVButton from "../components/atoms/DownloadCSVButton";


const DatosPage = () => {
  const [id, setId] = useState(1); // Estado para el ID del nodo seleccionado
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTipo, setSelectedTipo] = useState(""); // Estado para el tipo de dato seleccionado

  // Parámetros para la búsqueda de datos (params no necesita useState)
  const params = {
    offset: 0,
    limit: 500,
    nodo_id: id || 1,
    filterStartDate: startDate || "",
    filterEndDate: endDate || "",
    order: "desc",
    orderBy: "date",
    type: selectedTipo || 1 // Usamos el tipo seleccionado o 1 por defecto
  };

  // Obtención de datos del nodo con hook useFetchNodoData
  const { data, loading, error, mutate, isForbidden } = useFetchNodoData(params);

  // Obtención de nodos con useNodos
  const { nodos, loading: loadingSensores, error: errorSensores } = useNodos();

  // Obtención de los tipos con useTipos
  const { tipos, loading: loadingTipos, error: errorTipos } = useTipoDato();

  // Manejo de error y carga
  if (error) {
    return <p>Hubo un problema al cargar los datos. Intenta nuevamente más tarde.</p>;
  }

  if (loadingSensores || loadingTipos) return <LoadingSpinner />; // Mostrar spinner mientras se cargan los nodos o tipos

  // Filtro de fechas
  const handleFilterChange = (newStartDate, newEndDate) => {
    const previousStartDate = startDate;
    const previousEndDate = endDate;

    if (newStartDate && newEndDate && new Date(newStartDate) > new Date(newEndDate)) {
      alert('La fecha de inicio no puede ser posterior a la fecha de fin.');
      setStartDate(previousStartDate);
      setEndDate(previousEndDate);
      return;
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };


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
              <strong>Seleccionar Nodo</strong>
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
                    {`${nodo.identificador}`}
                  </option>
                ))
              )}
            </select>
          </div>
        )}

        <div className="mb-6">
          <label className="form-label me-2 mb-1">
            <strong>Seleccionar Tipo de Dato</strong>
          </label>
          <select
            id="tipoDato"
            className="form-select"
            value={selectedTipo}
            onChange={(e) => setSelectedTipo(e.target.value)} // Actualizamos el tipo seleccionado
          >
              {/* Si no hay tipos, mostrar un mensaje por defecto */}
              {tipos.length === 0 ? (
                <option value="">No hay nodos disponibles</option>
              ) : (
              tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.data_type}> {/* Usamos el data_type como valor */}
                {tipo.nombre} ({tipo.data_symbol})
              </option>
            ))
          )}
          </select>
        </div>

        <div className="flex items-center mb-4 justify-between">
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
          <TableView data={data} loading={loading} tipoDato={selectedTipo || 1}/>
        )}
      </div>
    </Container>
  );
};

export default DatosPage;