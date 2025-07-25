import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import PetForm from "./components/PetForm";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="container">
      <h1>🐾 Pet Marketplace</h1>
      {!loggedIn ? (
        <AuthForm onLoginSuccess={() => setLoggedIn(true)} />
      ) : (
        <PetForm />
      )}
    </div>
  );
}

export default App;
