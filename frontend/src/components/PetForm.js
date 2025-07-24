import React, { useState } from 'react';
import axios from 'axios';

const PetForm = () => {
  const [formData, setFormData] = useState({
    name: '', breed: '', age: '', location: '', description: '', images: []
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    setFormData(prev => ({ ...prev, images: e.target.files }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'images') {
        for (let file of value) data.append('images', file);
      } else {
        data.append(key, value);
      }
    });

    try {
      await axios.post('https://pet-marketplace-backend.onrender.com/api/pets', data);
      alert('Pet uploaded successfully!');
    } catch (err) {
      alert('Error uploading pet.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="breed" placeholder="Breed" onChange={handleChange} required />
      <input name="age" placeholder="Age" onChange={handleChange} required />
      <input name="location" placeholder="Location" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="file" multiple onChange={handleFileChange} required />
      <button type="submit">Submit Pet</button>
    </form>
  );
};

export default PetForm;
