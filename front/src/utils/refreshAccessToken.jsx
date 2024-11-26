const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    setIsAuthenticated(false);
    return false;
  }
  try {
    const response = await axiosInstance.post("/refresh_token", {
      refresh_token: refreshToken,
    });
    const { access_token: newAccessToken, refresh_token: newRefreshToken } =
      response.data;

    localStorage.setItem("access_token", newAccessToken);
    localStorage.setItem("refresh_token", newRefreshToken);
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setIsAuthenticated(true);

    return true;
  } catch (err) {
    console.error("Error al refrescar el token:", err);
    logout();
    return false;
  }
};

export default refreshAccessToken;
