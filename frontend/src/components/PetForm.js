import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PetForm() {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    location: '',
    description: '',
    images: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const body = new FormData();
    for (let key in formData) {
      if (key === 'images') {
        for (let i = 0; i < formData.images.length; i++) {
          body.append('images', formData.images[i]);
        }
      } else {
        body.append(key, formData[key]);
      }
    }

    const res = await fetch('https://pet-marketplace-backend.onrender.com/api/pets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    if (res.ok) {
      alert('Pet listed successfully!');
      navigate('/');
    } else {
      alert('Error uploading pet');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Post a Pet</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input name="name" placeholder="Name" className="w-full border p-2 rounded" onChange={handleChange} required />
        <input name="breed" placeholder="Breed" className="w-full border p-2 rounded" onChange={handleChange} required />
        <input name="age" placeholder="Age" className="w-full border p-2 rounded" onChange={handleChange} required />
        <input name="location" placeholder="Location" className="w-full border p-2 rounded" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" className="w-full border p-2 rounded" onChange={handleChange} required />
        <input type="file" name="images" multiple onChange={handleFileChange} className="w-full" required />
        <button className="bg-purple-600 text-white w-full py-2 rounded hover:bg-purple-700">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PetForm;
