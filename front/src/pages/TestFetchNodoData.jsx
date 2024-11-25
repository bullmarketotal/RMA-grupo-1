import React, { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import useFetchNodoData from "../hooks/useFetchNodoData";

const TestFetchNodoData = () => {
  const [params, setParams] = useState({
    offset: 0,
    limit: 10,
    nodo_id: null,
    orderBy: null,
    order: "asc",
    filterStartDate: null,
    filterEndDate: null,
    dataMin: null,
    dataMax: null,
    type: null,
  });

  const { data, loading, error, isForbidden, mutate } =
    useFetchNodoData(params);

  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    if (sorting.length > 0) {
      const [sort] = sorting;
      setParams((prevParams) => ({
        ...prevParams,
        orderBy: sort.id,
        order: sort.desc ? "desc" : "asc",
        offset: 0,
      }));
    }
  }, [sorting]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]:
        name === "offset" ||
        name === "limit" ||
        name === "dataMin" ||
        name === "dataMax" ||
        name === "nodo_id" ||
        name === "type"
          ? Number(value)
          : value,
      offset: 0,
    }));
  };

  const handleRefresh = () => {
    mutate();
  };

  const handlePageChange = (direction) => {
    setParams((prevParams) => ({
      ...prevParams,
      offset:
        direction === "next"
          ? prevParams.offset + prevParams.limit
          : Math.max(prevParams.offset - prevParams.limit, 0),
    }));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "nodo_id",
        header: () => "Nodo ID",
      },
      {
        accessorKey: "data",
        header: () => "Data",
      },
      {
        accessorKey: "date",
        header: () => "Date",
      },
      {
        accessorKey: "type_id",
        header: () => "Tipo ID",
      },
    ],
    []
  );

  const table = useReactTable({
    data: data.items || [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
  });

  return (
    <div className="normal-text">
      <h1>Test Fetch Nodo Data</h1>
      <div>
        {/* Inputs */}
        <label>
          Offset:
          <input
            type="number"
            name="offset"
            value={params.offset}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Limit:
          <input
            type="number"
            name="limit"
            value={params.limit}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Nodo ID:
          <input
            type="number"
            name="nodo_id"
            value={params.nodo_id || ""}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Order:
          <select
            name="order"
            value={params.order}
            onChange={handleInputChange}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="filterStartDate"
            value={params.filterStartDate || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="filterEndDate"
            value={params.filterEndDate || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Data Min:
          <input
            type="number"
            name="dataMin"
            value={params.dataMin || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Data Max:
          <input
            type="number"
            name="dataMax"
            value={params.dataMax || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Type:
          <input
            type="number"
            name="type"
            value={params.type || ""}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleRefresh}>Mutate</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {isForbidden && <p>Forbidden Access</p>}

      <div className="container mx-auto pt-4">
        {data.items && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="px-6 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider cursor-pointer"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{ asc: " 🔼", desc: " 🔽" }[
                          header.column.getIsSorted()
                        ] ?? null}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {data.info && (
          <div className="flex justify-between items-center mt-4">
            <div>
              <button
                onClick={() => handlePageChange("prev")}
                disabled={params.offset === 0}
                className="btn btn-inactive mr-2 disabled:opacity-50"
              >
                ⬅️
              </button>
              <button
                onClick={() => handlePageChange("next")}
                className="btn btn-inactive"
              >
                ➡️
              </button>
            </div>
            <div className="text-sm text-gray-700">
              Página {params.offset / params.limit + 1} de
              {Math.ceil(data.info.total_items / params.limit)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestFetchNodoData;
