import React, { useContext, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { AuthContext } from "../context/AuthContext";

const api = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const { login, logout, isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (user, password) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, password }),
      });

      if (!res.ok) {
        throw new Error("Error al iniciar sesión");
      }
      const data = await res.json();

      // Llamar al login del contexto
      login(data.token);

      console.log("Token:", data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (user, password) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${api}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, password }),
      });

      if (!res.ok) {
        throw new Error("Error al registrarse");
      }
      const data = await res.json();

      console.log("Registro exitoso:", data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title mb-4">
            {isAuthenticated
              ? "Ya estás autenticado"
              : isLogin
              ? "Iniciar Sesión"
              : "Registro"}
          </h1>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {!isAuthenticated ? (
                <>
                  {isLogin ? (
                    <LoginForm onLogin={handleLogin} loading={loading} />
                  ) : (
                    <RegisterForm onRegister={handleRegister} />
                  )}
                  <button
                    className="btn btn-link"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin
                      ? "¿No tienes cuenta? Regístrate"
                      : "¿Ya tienes cuenta? Inicia sesión"}
                  </button>
                </>
              ) : (
                <button className="btn btn-outline-danger" onClick={logout}>
                  Cerrar Sesión
                </button>
              )}

              {error && <div className="alert alert-danger">{error}</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
