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

export default fetcher;
