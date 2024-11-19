import useSWR from "swr";
import { api } from "../api";

const fetcher = async (url) => {
  try {
    const response = await api.get(url);
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

const useFetchSensorData = ({
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
  const query = new URLSearchParams({
    offset,
    limit,
    nodo_id: nodo_id || "",
    order_by: orderBy || "",
    order: order || "",
    start_date: filterStartDate || "",
    end_date: filterEndDate || "",
    data_min: dataMin || "",
    data_max: dataMax || "",
    type: type || "",
  }).toString();

  const { data, error, isValidating } = useSWR(`/paquetes?${query}`, fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 60000,
  });

  const isForbidden = error?.status === 403;

  return { data: data ?? [], isValidating, error, isForbidden };
};

export default useFetchSensorData;
