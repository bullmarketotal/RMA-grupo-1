import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {
    loginUserWrapper,
    loading,
    error,
    isAuthenticated,
    username: user,
  } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUserWrapper(username, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/inicio");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center dark-bg">
      <div className="max-w-md w-full normal-text normal-bg p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="input-text mt-1 block w-full p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="input-text mt-1 block w-full p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full btn-action btn-active py-2 disabled:btn-disabled"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          No tienes una cuenta?{" "}
          <Link to="/register" className="text-sky-500 hover:text-sky-600">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
