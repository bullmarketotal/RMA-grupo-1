import axios from "axios";
import { createAxiosInstance } from "./axiosService";

export const loginUser = async (username, password, getToken) => {
  const axiosInstance = createAxiosInstance(getToken);

  const data = new URLSearchParams();
  data.append("username", username);
  data.append("password", password);
  data.append("grant_type", "password");

  try {
    const response = await axiosInstance.post("/login_token", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error.response || error);
    throw new Error(
      "Error al iniciar sesión. Por favor, verifica tus credenciales."
    );
  }
};
