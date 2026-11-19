import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
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
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'CodingX FullStack DSA Engine',
    database: 'MongoDB (Strict Database Mode)',
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
  // Connect strictly to MongoDB
  await connectDB();
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 CodingX Backend API running at http://localhost:${PORT}`);
    console.log(`🍃 Database: MongoDB Strictly Connected (mongodb://127.0.0.1:27017/codingx)`);
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
