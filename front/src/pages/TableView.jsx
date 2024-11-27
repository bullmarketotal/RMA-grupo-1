import React from "react";

const TableView = ({ data, loading, tipoDato }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No hay datos disponibles</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nodo ID</th>
          <th>Data</th>
          <th>Date</th>
          <th>Type ID</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nodo_id}</td>
            <td>{item.data}</td>
            <td>{new Date(item.date).toLocaleString()}</td>
            <td>{item.type_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;
