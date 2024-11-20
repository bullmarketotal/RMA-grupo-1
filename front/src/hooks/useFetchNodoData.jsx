import useSWR from "swr";
import { useMemo } from "react";
import { useAxios } from "../context/AxiosProvider";

const fetcher = async (url, axios) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const err = new Error("Forbidden");
      err.status = 403;
      throw err;
    }
    throw error;
  }
};

const useFetchNodoData = ({
  offset,
  limit,
  nodo_id,
  orderBy,
  order,
  filterStartDate,
  filterEndDate,
  dataMin,
  dataMax,
  type,
}) => {
  const axios = useAxios();

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (offset !== undefined) params.append("offset", offset);
    if (limit !== undefined) params.append("limit", limit);
    if (nodo_id) params.append("nodo_id", nodo_id);
    if (orderBy) params.append("order_by", orderBy);
    if (order) params.append("order", order);
    if (filterStartDate) params.append("start_date", filterStartDate);
    if (filterEndDate) params.append("end_date", filterEndDate);
    if (dataMin) params.append("data_min", dataMin);
    if (dataMax) params.append("data_max", dataMax);
    if (type) params.append("type", type);

    return params.toString();
  }, [
    offset,
    limit,
    nodo_id,
    orderBy,
    order,
    filterStartDate,
    filterEndDate,
    dataMin,
    dataMax,
    type,
  ]);

  const { data, error, isValidating, mutate } = useSWR(
    `/paquetes?${query}`,
    (url) => fetcher(url, axios),
    {
      revalidateOnFocus: false,
      errorRetryCount: 3,
      errorRetryInterval: 10000,
      dedupingInterval: 60000,
    }
  );

  const isForbidden = error?.status === 403;

  return {
    data: data ?? [],
    loading: isValidating,
    error,
    isForbidden,
    mutate,
  };
};

export default useFetchNodoData;
