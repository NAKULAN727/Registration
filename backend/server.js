const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.error("DB Error:", err));

// Mongoose Schema
const touristSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  blockchainId: String,
  transactionHash: String,
  location: {
    lat: Number,
    lng: Number,
    updatedAt: Date
  },
  tripDetails: {
    destination: String,
    startDate: String,
    endDate: String
  },
  guardianName: String,
  guardianPhone: String,
  status: { type: String, default: 'SAFE' },
  createdAt: { type: Date, default: Date.now }
});

const Tourist = mongoose.model('Tourist', touristSchema);

// API Routes

// 1. Register a tourist
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, blockchainId, transactionHash, tripDetails, guardianName, guardianPhone } = req.body;
    
    // Create new Tourist document
    const newTourist = new Tourist({
      name,
      email,
      phone,
      blockchainId,
      transactionHash,
      tripDetails,
      guardianName,
      guardianPhone
    });

    await newTourist.save();
    res.status(201).json({ message: 'Tourist registered successfully', data: newTourist });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// 2. Fetch all tourists (for Police Dashboard)
app.get('/api/tourists', async (req, res) => {
  try {
    const tourists = await Tourist.find().sort({ createdAt: -1 });
    res.status(200).json(tourists);
  } catch (error) {
    console.error("Fetch tourists error:", error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Add a root route for quick testing
app.get('/', (req, res) => {
  res.send('Backend Server is running on port 5000');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
