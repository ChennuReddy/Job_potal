import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://job-potal-12.onrender.com/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      const text = await response.text();

      let data = {};
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error("Invalid JSON:", text);
        setError("Server returned an invalid response");
        return;
      }

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(data?.detail || JSON.stringify(data));
      }
    } catch (err) {
      console.error("Network Error:", err);
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf6f0]">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl px-10 py-12">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Create an Account</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-pink-400 text-white font-semibold py-3 rounded-xl shadow-md hover:opacity-90 transition duration-300"
          >
            Register
          </button>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">Error: {error}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
