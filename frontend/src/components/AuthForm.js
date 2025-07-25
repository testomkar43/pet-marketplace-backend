import React, { useState } from "react";

const AuthForm = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isLogin) {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        alert("Login successful!");
        onLoginSuccess(); // Show pet form
      } else {
        alert("Invalid credentials or not registered.");
      }
    } else {
      if (users.find((u) => u.username === username)) {
        alert("User already exists.");
      } else {
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registered! Please log in.");
        setIsLogin(true);
      }
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          required
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <p id="switch-auth">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span id="toggle-auth" onClick={toggleMode}>
          {isLogin ? " Register" : " Login"}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;
