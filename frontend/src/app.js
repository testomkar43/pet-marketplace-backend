import React from 'react';
import PetForm from './components/PetForm';
import PetList from './components/PetList';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🐾 Pet Marketplace</h1>
      <PetForm />
      <hr />
      <PetList />
    </div>
  );
}

export default App;
