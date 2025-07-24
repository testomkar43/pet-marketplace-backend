import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('https://pet-marketplace-backend.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      alert('Login successful!');
      navigate('/pet-form');
    } else {
      alert(data.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
