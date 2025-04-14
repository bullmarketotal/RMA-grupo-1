import { useState } from "react";
import { useNodos } from "../hooks/useNodos";
import { useCuencas } from "../hooks/useCuencas";

const GestionNodosPage = () => {
  const { nodos, loading, error, updateNodo } = useNodos();
  const { cuencas } = useCuencas();
  const [cuencaSeleccionada, setCuencaSeleccionada] = useState({});

  const handleChange = (nodoId, cuencaId) => {
    setCuencaSeleccionada((prev) => ({
      ...prev,
      [nodoId]: cuencaId,
    }));
  };

  const handleGuardar = async (nodo) => {
    console.log(nodo);
    const nuevaCuenca = cuencaSeleccionada[nodo.id];
    if (nuevaCuenca) {
      nodo.cuenca_id = nuevaCuenca;
      await updateNodo(nodo.id,nodo);
    }
  };

  if (loading) return <div className="p-4">Cargando nodos...</div>;
  if (error) return <div className="p-4 text-red-500">Error al cargar nodos.</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Gestión de Nodos</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Alias</th>
              <th className="py-2 px-4 border-b">Cuenca actual</th>
              <th className="py-2 px-4 border-b">Nueva cuenca</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(nodos) && nodos.map((nodo) => (
              <tr key={nodo.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{nodo.id}</td>
                <td className="py-2 px-4 border-b">{nodo.identificador}</td>
                <td className="py-2 px-4 border-b">
                  {cuencas.find(c => c.id === nodo.cuenca_id)?.nombre || "Sin cuenca"}
                </td>
                <td className="py-2 px-4 border-b">
                  <select
                    value={cuencaSeleccionada[nodo.id] || ""}
                    onChange={(e) => handleChange(nodo.id, e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  >
                    <option value="">Seleccione</option>
                    {cuencas.map((cuenca) => (
                      <option key={cuenca.id} value={cuenca.id}>
                        {cuenca.nombre}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleGuardar(nodo)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                  >
                    Guardar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionNodosPage;
