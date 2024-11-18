import React, { useState } from "react";
import { useTableInstance } from "@tanstack/react-table";
import { useNodos } from "../hooks/useNodos"; // Ajusta la ruta según sea necesario

const NodoTable = () => {
  const { nodos, loading, error, updateNodo, deleteNodo } = useNodos();
  const [editingNodo, setEditingNodo] = useState(null);

  const columns = React.useMemo(
    () => [
      { accessor: "identificador", Header: "Identificador" },
      { accessor: "porcentajeBateria", Header: "Porcentaje Batería" },
      { accessor: "latitud", Header: "Latitud" },
      { accessor: "longitud", Header: "Longitud" },
      { accessor: "descripcion", Header: "Descripción" },
      {
        id: "actions",
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            <button onClick={() => setEditingNodo(row.original)}>Edit</button>
            <button onClick={() => deleteNodo(row.original.id)}>Delete</button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTableInstance({ columns, data: nodos });

  const handleUpdate = (updatedNodo) => {
    updateNodo(updatedNodo.id, updatedNodo);
    setEditingNodo(null);
  };

  return (
    <div>
      <h1>Nodos Table</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {editingNodo && (
        <div>
          <h2>Edit Nodo</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editingNodo);
            }}
          >
            <input
              type="text"
              value={editingNodo.identificador}
              onChange={(e) =>
                setEditingNodo({
                  ...editingNodo,
                  identificador: e.target.value,
                })
              }
              placeholder="Identificador"
            />
            <input
              type="number"
              value={editingNodo.porcentajeBateria}
              onChange={(e) =>
                setEditingNodo({
                  ...editingNodo,
                  porcentajeBateria: Number(e.target.value),
                })
              }
              placeholder="Porcentaje Batería"
            />
            <input
              type="number"
              value={editingNodo.latitud ?? ""}
              onChange={(e) =>
                setEditingNodo({
                  ...editingNodo,
                  latitud:
                    e.target.value !== "" ? Number(e.target.value) : null,
                })
              }
              placeholder="Latitud"
            />
            <input
              type="number"
              value={editingNodo.longitud ?? ""}
              onChange={(e) =>
                setEditingNodo({
                  ...editingNodo,
                  longitud:
                    e.target.value !== "" ? Number(e.target.value) : null,
                })
              }
              placeholder="Longitud"
            />
            <input
              type="text"
              value={editingNodo.descripcion}
              onChange={(e) =>
                setEditingNodo({ ...editingNodo, descripcion: e.target.value })
              }
              placeholder="Descripción"
            />
            <button type="submit">Save</button>
            <button onClick={() => setEditingNodo(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NodoTable;
