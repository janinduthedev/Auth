import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';

const app = express();
dotenv.config();

// --- Middlewares Setup ---
app.use(express.json()); // Support JSON
app.use(cors());         // Allow access

app.use('/api/auth', authRoutes);

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected... ✅"))
  .catch(err => console.error("Error: ❌", err));

// --- Server Port ---
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));