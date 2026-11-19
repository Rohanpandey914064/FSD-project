import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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
  res.json({
    status: 'online',
    platform: 'CodingX FullStack DSA Engine',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/problems', problemsRouter);
app.use('/api/contests', contestsRouter);
app.use('/api/auth', authRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 CodingX Backend API running at http://localhost:${PORT}`);
  console.log(`📡 Endpoints available:`);
  console.log(`   - GET  /api/health`);
  console.log(`   - GET  /api/problems`);
  console.log(`   - GET  /api/problems/:idOrSlug`);
  console.log(`   - POST /api/problems/:id/run`);
  console.log(`   - POST /api/problems/:id/submit`);
  console.log(`   - GET  /api/contests`);
  console.log(`   - GET  /api/auth/me`);
});
