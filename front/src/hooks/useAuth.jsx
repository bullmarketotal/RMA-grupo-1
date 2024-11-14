import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = new URLSearchParams();
      data.append("username", username);
      data.append("password", password);
      data.append("grant_type", "password");
      data.append("client_id", "client_id_value");
      data.append("client_secret", "client_secret_value");

      const response = await axios.post(
        "http://127.0.0.1:8000/login_token",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token, refresh_token } = response.data;
      login(access_token, refresh_token);
      return access_token;
    } catch (error) {
      console.error("Error logging in:", error.response || error);
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
