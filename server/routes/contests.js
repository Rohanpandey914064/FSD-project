import express from 'express';
import { contestsData, leaderboardData } from '../data/contestsData.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, contests: contestsData });
});

router.get('/leaderboard', (req, res) => {
  res.json({ success: true, leaderboard: leaderboardData });
});

export default router;
