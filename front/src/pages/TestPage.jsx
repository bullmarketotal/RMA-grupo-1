import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNodos } from "../hooks/useNodos";
import { Container } from "../components/atoms";
const columnHelper = createColumnHelper();
const TableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value);
  };
  const onSelectChange = (e) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };
  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <select onChange={onSelectChange} value={value}>
        {" "}
        {columnMeta?.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {" "}
            {option.label}{" "}
          </option>
        ))}{" "}
      </select>
    ) : (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
      />
    );
  }
  return <span>{value}</span>;
};
const EditCell = ({ row, table }) => {
  const meta = table.options.meta;
  const setEditedRows = async (e) => {
    const elName = e.currentTarget.name;
    const rowIndex = row.index;
    if (elName === "done") {
      const updatedNodo = table.options.data[rowIndex];
      await meta.updateRow(updatedNodo.id, updatedNodo);
    }
    meta?.setEditedRows((old) => ({ ...old, [row.id]: !old[row.id] }));
    if (elName !== "edit") {
      meta?.revertData(rowIndex, elName === "cancel");
    }
  };
  return (
    <div className="edit-cell-container">
      {" "}
      {meta?.editedRows[row.id] ? (
        <div className="edit-cell">
          {" "}
          <button onClick={setEditedRows} name="cancel">
            {" "}
            X{" "}
          </button>{" "}
          <button onClick={setEditedRows} name="done">
            {" "}
            ✔{" "}
          </button>{" "}
        </div>
      ) : (
        <button onClick={setEditedRows} name="edit">
          {" "}
          ✐{" "}
        </button>
      )}{" "}
    </div>
  );
};
const columns = [
  columnHelper.accessor("identificador", {
    header: "Identificador",
    cell: TableCell,
    meta: { type: "text" },
  }),
  columnHelper.accessor("porcentajeBateria", {
    header: "Porcentaje Batería",
    cell: TableCell,
    meta: { type: "number" },
  }),
  columnHelper.accessor("latitud", {
    header: "Latitud",
    cell: TableCell,
    meta: { type: "number" },
  }),
  columnHelper.accessor("longitud", {
    header: "Longitud",
    cell: TableCell,
    meta: { type: "number" },
  }),
  columnHelper.accessor("descripcion", {
    header: "Descripción",
    cell: TableCell,
    meta: { type: "text" },
  }),
  columnHelper.display({ id: "edit", cell: EditCell }),
  columnHelper.display({
    id: "delete",
    cell: ({ row, table }) => (
      <button onClick={() => table.options.meta.deleteRow(row.original.id)}>
        {" "}
        Eliminar{" "}
      </button>
    ),
  }),
];
const NodoTable = () => {
  const { nodos, loading, error, addNodo, updateNodo, deleteNodo } = useNodos({
    enableAdd: true,
    enableUpdate: true,
    enableDelete: true,
  });
  const [data, setData] = useState(() => [...nodos]);
  const [originalData, setOriginalData] = useState(() => [...nodos]);
  const [editedRows, setEditedRows] = useState({});
  const [newNodo, setNewNodo] = useState({
    identificador: "",
    porcentajeBateria: 0,
    latitud: null,
    longitud: null,
    descripcion: "",
  });
  useEffect(() => {
    setData([...nodos]);
    setOriginalData([...nodos]);
  }, [nodos]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      updateRow: async (nodoId, updatedNodo) => {
        await updateNodo(nodoId, updatedNodo);
      },
      deleteRow: async (nodoId) => {
        await deleteNodo(nodoId);
        setData((old) => old.filter((nodo) => nodo.id !== nodoId));
      },
      revertData: (rowIndex, revert) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return { ...old[rowIndex], [columnId]: value };
            }
            return row;
          })
        );
      },
      addRow: async () => {
        if (newNodo.identificador && newNodo.porcentajeBateria) {
          await addNodo(newNodo);
          setNewNodo({
            identificador: "",
            porcentajeBateria: 0,
            latitud: null,
            longitud: null,
            descripcion: "",
          });
        }
      },
    },
  });

  return (
    <Container>
      <h1>Gestión de Nodos</h1>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td>
              <input
                value={newNodo.identificador}
                onChange={(e) =>
                  setNewNodo({ ...newNodo, identificador: e.target.value })
                }
                placeholder="Identificador"
              />
            </td>
            <td>
              <input
                type="number"
                value={newNodo.porcentajeBateria}
                onChange={(e) =>
                  setNewNodo({
                    ...newNodo,
                    porcentajeBateria: Number(e.target.value),
                  })
                }
                placeholder="Porcentaje Batería"
              />
            </td>
            <td>
              <input
                type="number"
                value={newNodo.latitud ?? ""}
                onChange={(e) =>
                  setNewNodo({
                    ...newNodo,
                    latitud:
                      e.target.value !== "" ? Number(e.target.value) : null,
                  })
                }
                placeholder="Latitud"
              />
            </td>
            <td>
              <input
                type="number"
                value={newNodo.longitud ?? ""}
                onChange={(e) =>
                  setNewNodo({
                    ...newNodo,
                    longitud:
                      e.target.value !== "" ? Number(e.target.value) : null,
                  })
                }
                placeholder="Longitud"
              />
            </td>
            <td>
              <input
                value={newNodo.descripcion}
                onChange={(e) =>
                  setNewNodo({ ...newNodo, descripcion: e.target.value })
                }
                placeholder="Descripción"
              />
            </td>
            <td>
              <button onClick={table.options.meta.addRow}>Añadir</button>
            </td>
          </tr>
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </Container>
  );
};

export default NodoTable;
