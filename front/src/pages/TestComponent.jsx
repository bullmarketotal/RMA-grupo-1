import React, { useState } from "react";
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: value,
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

  return (
    <div>
      <h1>Test FetchNodoData</h1>
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
          Order By:
          <input
            type="text"
            name="orderBy"
            value={params.orderBy || ""}
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
        <button onClick={handleRefresh}>Refresh</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {isForbidden && <p>Acá poner que hacer cuando no está permitido algo</p>}

      {data.items && (
        <div>
          <ul>
            {data.items.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>
          <button
            onClick={() => handlePageChange("prev")}
            disabled={params.offset === 0}
          >
            Previous
          </button>
          <button onClick={() => handlePageChange("next")}>Next</button>
        </div>
      )}
    </div>
  );
};

export default TestFetchNodoData;
