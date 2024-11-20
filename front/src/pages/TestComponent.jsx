import React from "react";
import useFetchNodoData from "../hooks/useFetchNodoData";
import TestTable from "./TestTable";

function App() {
  const rerender = React.useReducer(() => ({}), {})[1];

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "nodo_id",
        cell: (info) => info.getValue(),
        header: "Nodo ID",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "data",
        cell: (info) => info.getValue(),
        header: "Data",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "date",
        cell: (info) => new Date(info.getValue()).toLocaleString(),
        header: "Date",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "type_id",
        cell: (info) => info.getValue(),
        header: "Type ID",
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const { data, loading, error, mutate } = useFetchNodoData({
    offset: 0,
    limit: 110,
  });

  return (
    <>
      <TestTable
        data={data.items}
        columns={columns}
        loading={loading}
        error={error}
      />
      <hr />
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => mutate()}>Refresh Data</button>
      </div>
    </>
  );
}

export default App;
