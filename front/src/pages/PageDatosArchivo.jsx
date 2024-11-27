import { useState } from "react";
import { usePaqueteArchivo, useTipoDato } from "../hooks";
import { Container, Header, LoadingSpinner } from "../components/atoms";
import { FiltroDatos } from "../components/molecules";
import { TableView } from "../components/organisms";
import DownloadCSVButton from "../components/atoms/DownloadCSVButton";

const DatosPage = () => {
  const [id, setId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("");

  const params = {
    offset: 0,
    limit: 500,
    nodo_id: id,
    filterStartDate: startDate || "",
    filterEndDate: endDate || "",
    order: "desc",
    orderBy: "date",
    type: selectedTipo || 1,
  };

  const { data, pagination, loading, error, isForbidden, mutate } =
    usePaqueteArchivo(params);
  const { tipos, loading: loadingTipos, error: errorTipos } = useTipoDato();

  if (error) {
    return (
      <p>Hubo un problema al cargar los datos. Intenta nuevamente más tarde.</p>
    );
  }

  if (loading || loadingTipos) return <LoadingSpinner />;

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

  return (
    <Container>
      <Header title={"Datos de Nodos"} />
      <div className="card-body">
        <div className="mb-6">
          <label className="form-label me-2 mb-1">
            <strong>Ingresar ID Nodo</strong>
          </label>
          <input
            type="number"
            id="sensorId"
            className="input-text form-input max-w-32"
            value={id || ""}
            placeholder="ID del nodo"
            onChange={(e) => setId(parseInt(e.target.value) || null)}
          />
        </div>

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

          <div className="px-2">
            <DownloadCSVButton data={data || []} disabled={loading} />
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <TableView
            data={{ items: data }}
            loading={loading}
            tipoDato={selectedTipo || 1}
          />
        )}
      </div>
    </Container>
  );
};

export default DatosPage;
