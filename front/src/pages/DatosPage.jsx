import { useState, useEffect } from "react";
import { useFetchNodoData, useNodos, useTipoDato } from "../hooks";
import { Container, Header, LoadingSpinner } from "../components/atoms";
import { FiltroDatos } from "../components/molecules";
import { TableView } from "../components/organisms";
import DownloadCSVButton from "../components/atoms/DownloadCSVButton";
import { useNavigate } from "react-router-dom";

const DatosPage = () => {
  const [id, setId] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 25;

  const params = {
    offset: (currentPage - 1) * itemsPerPage,
    limit: itemsPerPage,
    nodo_id: id || 1,
    filterStartDate: startDate || "",
    filterEndDate: endDate || "",
    order: "desc",
    orderBy: "date",
    type: selectedTipo || 1,
  };

  const { data, loading, error, mutate, isForbidden } =
    useFetchNodoData(params);
  const { nodos, loading: loadingSensores, error: errorSensores } = useNodos();
  const { tipos, loading: loadingTipos, error: errorTipos } = useTipoDato();

  if (error) {
    return (
      <p>Hubo un problema al cargar los datos. Intenta nuevamente más tarde.</p>
    );
  }

  if (loadingSensores || loadingTipos) return <LoadingSpinner />;

  const handleFilterChange = (newStartDate, newEndDate) => {
    const previousStartDate = startDate;
    const previousEndDate = endDate;

    if (
      newStartDate &&
      newEndDate &&
      new Date(newStartDate) > new Date(newEndDate)
    ) {
      alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
      setStartDate(previousStartDate);
      setEndDate(previousEndDate);
      return;
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNavigate = () => {
    navigate("/datos-view/archivos");
  };

  return (
    <Container>
      <Header title={"Datos de Nodos"} />
      <div className="card-body">
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
            onChange={(e) => setSelectedTipo(e.target.value)}
          >
            {tipos.length === 0 ? (
              <option value="">No hay tipos disponibles</option>
            ) : (
              tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.data_type}>
                  {tipo.nombre} ({tipo.data_symbol})
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex items-center mb-4 justify-between">
          <FiltroDatos onFilterChange={handleFilterChange} className="px-2" />
          <div className="flex space-x-2 px-2">
            <DownloadCSVButton data={data?.items || []} disabled={loading} />
            <button className="btn btn-secondary" onClick={handleNavigate}>
              Ver Archivos
            </button>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <TableView
            data={{ items: data.items, pagination: data.info }}
            loading={loading}
            tipoDato={selectedTipo || 1}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </Container>
  );
};

export default DatosPage;
