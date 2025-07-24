
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({
    name: '', breed: '', age: '', location: '', description: '', images: []
  });

  const fetchPets = async () => {
    const res = await axios.get('http://localhost:5000/api/pets');
    setPets(res.data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'images') {
        [...value].forEach(img => data.append('images', img));
      } else {
        data.append(key, value);
      }
    });
    await axios.post('http://localhost:5000/api/pets', data);
    fetchPets();
  };

  useEffect(() => { fetchPets(); }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Add Pet Listing</h1>
      <form onSubmit={handleUpload}>
        <input placeholder="Name" onChange={e => setFormData({ ...formData, name: e.target.value })} /><br />
        <input placeholder="Breed" onChange={e => setFormData({ ...formData, breed: e.target.value })} /><br />
        <input placeholder="Age" onChange={e => setFormData({ ...formData, age: e.target.value })} /><br />
        <input placeholder="Location" onChange={e => setFormData({ ...formData, location: e.target.value })} /><br />
        <textarea placeholder="Description" onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea><br />
        <input type="file" multiple onChange={e => setFormData({ ...formData, images: e.target.files })} /><br />
        <button type="submit">Upload</button>
      </form>

      <hr className="my-4" />
      <h2 className="text-lg font-semibold">All Pets</h2>
      {pets.map(p => (
        <div key={p._id} className="border my-2 p-2">
          <h3>{p.name} - {p.breed}</h3>
          <p>{p.age} | {p.location}</p>
          <p>{p.description}</p>
          {p.images.map((img, i) => (
            <img key={i} src={`http://localhost:5000/${img}`} width="100" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
