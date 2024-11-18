import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAxios } from "../context/AxiosProvider";

const useAuth = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axios = useAxios();

  const loginUser = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = new URLSearchParams();
      data.append("username", username);
      data.append("password", password);
      data.append("grant_type", "password");

      const response = await axios.post("/login_token", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token, refresh_token } = response.data;
      login(access_token, refresh_token);
      return access_token;
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response || error);
      setError(
        "Error al iniciar sesión. Por favor, verifica tus credenciales."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    isAuthenticated,
    loginUser,
    logout,
    loading,
    error,
  };
};

export default useAuth;
