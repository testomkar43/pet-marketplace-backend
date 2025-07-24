
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/pet-marketplace');

const PetSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: String,
  location: String,
  description: String,
  images: [String]
});
const Pet = mongoose.model('Pet', PetSchema);

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/api/pets', upload.array('images'), async (req, res) => {
  const { name, breed, age, location, description } = req.body;
  const images = req.files.map(f => f.path);
  const pet = new Pet({ name, breed, age, location, description, images });
  await pet.save();
  res.json(pet);
});

app.get('/api/pets', async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
