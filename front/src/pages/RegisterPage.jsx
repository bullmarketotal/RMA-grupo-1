import React, { useState } from "react";
import useRegister from "../hooks/useRegister";
import { Link } from "react-router-dom";

const Register = () => {
  const { loading, error, register } = useRegister();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark-bg">
      <div className="max-w-md w-full p-8 rounded-lg shadow-lg normal-text normal-bg">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="input-text mt-1 block w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="input-text mt-1 block w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full btn-action btn-active text-white py-2 disabled:bg-blue-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Tienes una cuenta?{" "}
          <Link to="/login" className="text-sky-500 hover:text-sky-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
