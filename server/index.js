const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Define schema
const PetSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: String,
  location: String,
  description: String,
  images: [String]
});
const Pet = mongoose.model('Pet', PetSchema);

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Multer config
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// 🐾 Protected route
app.post('/api/pets', authMiddleware, upload.array('images'), async (req, res) => {
  try {
    const { name, breed, age, location, description } = req.body;
    const images = req.files.map(f => f.path);
    const pet = new Pet({ name, breed, age, location, description, images });
    await pet.save();
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Open routes
app.get('/api/pets', async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
});

app.get('/', (req, res) => {
  res.send('🐾 Welcome to the Pet Marketplace API! Use /api/pets to see all pets.');
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
