import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import seedDatabase from './config/seed.js';
import problemsRouter from './routes/problems.js';
import contestsRouter from './routes/contests.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  const isMongoConnected = mongoose.connection.readyState === 1;
  res.json({
    status: 'online',
    platform: 'CodingX FullStack DSA Engine',
    database: isMongoConnected ? 'MongoDB (Local Connected)' : 'In-Memory Fallback',
    mongodbState: mongoose.connection.readyState,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/problems', problemsRouter);
app.use('/api/contests', contestsRouter);
app.use('/api/auth', authRouter);

// Initialize Database & Start Server
const startServer = async () => {
  // Connect to Local MongoDB
  const isConnected = await connectDB();
  if (isConnected) {
    // Automatically seed if collections are empty
    await seedDatabase();
  }

  app.listen(PORT, () => {
    console.log(`🚀 CodingX Backend API running at http://localhost:${PORT}`);
    console.log(`🍃 Database: ${isConnected ? 'MongoDB (Connected: mongodb://127.0.0.1:27017/codingx)' : 'In-Memory Mock Fallback'}`);
    console.log(`📡 Endpoints available:`);
    console.log(`   - GET  /api/health`);
    console.log(`   - GET  /api/problems`);
    console.log(`   - GET  /api/problems/:idOrSlug`);
    console.log(`   - POST /api/problems/:id/run`);
    console.log(`   - POST /api/problems/:id/submit`);
    console.log(`   - GET  /api/contests`);
    console.log(`   - GET  /api/contests/leaderboard`);
    console.log(`   - GET  /api/auth/me`);
  });
};

startServer();
