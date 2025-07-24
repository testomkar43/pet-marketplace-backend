import React, { useState, useEffect } from 'react';
import Login from './components/Logintemp';
import Register from './components/Register';
import PetForm from './components/PetForm';
import Home from './Home';

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setUser(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-pink-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-purple-800">🐾 Pet Marketplace</h1>

      {user ? (
        <>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded mb-4">Logout</button>
          <PetForm />
        </>
      ) : (
        showRegister ? (
          <>
            <Register onSwitch={() => setShowRegister(false)} />
          </>
        ) : (
          <>
            <Login onLogin={handleLogin} onSwitch={() => setShowRegister(true)} />
          </>
        )
      )}
    </div>
  );
};

export default App;
