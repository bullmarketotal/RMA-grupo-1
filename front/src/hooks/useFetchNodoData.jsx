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
}) => {
  const axios = useAxios();

  const query = useMemo(
    () =>
      new URLSearchParams({
        offset,
        limit,
        nodo_id: nodo_id || "",
        order_by: orderBy || "",
        order: order || "",
        start_date: filterStartDate || "",
        end_date: filterEndDate || "",
        data_min: dataMin || "",
        data_max: dataMax || "",
      }).toString(),
    [
      offset,
      limit,
      nodo_id,
      orderBy,
      order,
      filterStartDate,
      filterEndDate,
      dataMin,
      dataMax,
    ]
  );

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
