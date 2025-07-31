import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://job-potal-12.onrender.com/api/login/", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      alert("Login failed: " + err.response?.data?.detail || "Unknown error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 px-4 text-white">
      <h1 className="text-4xl font-bold mb-6">Login</h1>

      <form
        className="flex flex-col w-full max-w-sm bg-white text-black rounded-xl shadow-xl p-6 space-y-4"
        onSubmit={handleLogin}
      >
        <input
          className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="py-3 px-6 rounded-md font-semibold shadow-md bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
           Login
        </button>
      </form>

      <p className="mt-4 text-sm">
        New user?{" "}
        <Link className="text-yellow-300 hover:underline" to="/register">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
