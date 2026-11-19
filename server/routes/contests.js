import express from 'express';
import mongoose from 'mongoose';
import { Contest, Leaderboard } from '../models/Contest.js';
import { contestsData, leaderboardData } from '../data/contestsData.js';

const router = express.Router();

const isDbConnected = () => mongoose.connection.readyState === 1;

router.get('/', async (req, res) => {
  try {
    if (isDbConnected()) {
      const contests = await Contest.find().sort({ id: 1 }).lean();
      return res.json({ success: true, source: 'MongoDB', contests });
    }
    res.json({ success: true, source: 'In-Memory', contests: contestsData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    if (isDbConnected()) {
      const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean();
      return res.json({ success: true, source: 'MongoDB', leaderboard });
    }
    res.json({ success: true, source: 'In-Memory', leaderboard: leaderboardData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
