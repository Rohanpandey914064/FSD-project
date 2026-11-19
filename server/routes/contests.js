import express from 'express';
import { Contest, Leaderboard } from '../models/Contest.js';

const router = express.Router();

// ── GET /api/contests (Fetch contests strictly from MongoDB) ──
router.get('/', async (req, res) => {
  try {
    const contests = await Contest.find().sort({ id: 1 }).lean();
    res.json({ success: true, source: 'MongoDB', contests });
  } catch (error) {
    res.status(500).json({ success: false, message: `MongoDB Query Error: ${error.message}` });
  }
});

// ── GET /api/contests/leaderboard (Fetch leaderboard strictly from MongoDB) ──
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean();
    res.json({ success: true, source: 'MongoDB', leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, message: `MongoDB Query Error: ${error.message}` });
  }
});

export default router;
