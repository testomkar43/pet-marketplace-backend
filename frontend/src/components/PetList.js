import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PetList = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get('https://pet-marketplace-backend.onrender.com/api/pets')
      .then(res => setPets(res.data))
      .catch(() => alert("Failed to fetch pets"));
  }, []);

  return (
    <div>
      <h2>Available Pets</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {pets.map((pet, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
            <h3>{pet.name} ({pet.breed})</h3>
            <p>{pet.description}</p>
            <p>📍 {pet.location} | Age: {pet.age}</p>
            {pet.images.map((img, i) => (
              <img
                key={i}
                src={`https://pet-marketplace-backend.onrender.com/${img}`}
                alt={pet.name}
                width={100}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetList;
