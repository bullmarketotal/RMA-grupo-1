import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNodos } from "../hooks/useNodos";

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
        {columnMeta?.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
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
  const setEditedRows = (e) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== "edit") {
      meta?.revertData(row.index, elName === "cancel");
    }
  };

  return (
    <div className="edit-cell-container">
      {meta?.editedRows[row.id] ? (
        <div className="edit-cell">
          <button onClick={setEditedRows} name="cancel">
            X
          </button>
          <button onClick={setEditedRows} name="done">
            ✔
          </button>
        </div>
      ) : (
        <button onClick={setEditedRows} name="edit">
          ✐
        </button>
      )}
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
  columnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
];

const NodoTable = () => {
  const { nodos, loading, error, updateNodo, deleteNodo } = useNodos();
  const [data, setData] = useState(() => [...nodos]);
  const [originalData, setOriginalData] = useState(() => [...nodos]);
  const [editedRows, setEditedRows] = useState({});

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
    },
  });

  return (
    <>
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
        </tbody>
      </table>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default NodoTable;
