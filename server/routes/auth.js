import express from 'express';
import { User } from '../models/User.js';

const router = express.Router();

// ── GET /api/auth/me (Fetch profile strictly from MongoDB) ──
router.get('/me', async (req, res) => {
  try {
    let user = await User.findOne({ userId: 'usr_9912' }).lean();

    if (!user) {
      // Initialize if not present
      user = await User.create({
        userId: 'usr_9912',
        username: 'rohan_coder',
        email: 'developer@codingx.com',
        role: 'USER',
        rating: 1845,
        globalRank: 142,
        streak: 7,
        solvedProblemIds: [1, 2],
        solved: { total: 24, easy: 15, medium: 7, hard: 2 },
      });
    }

    res.json({ success: true, source: 'MongoDB', user });
  } catch (error) {
    res.status(500).json({ success: false, message: `MongoDB Query Error: ${error.message}` });
  }
});

// ── POST /api/auth/login ──
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ userId: 'usr_9912' });

    if (user && email) {
      user.email = email;
      await user.save();
    }

    res.json({
      success: true,
      source: 'MongoDB',
      token: 'jwt-token-codingx-live-session',
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Auth Error: ${error.message}` });
  }
});

// ── POST /api/auth/register ──
router.post('/register', async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.create({
      userId: `usr_${Date.now()}`,
      username: username || 'new_coder',
      email: email || 'user@codingx.com',
      role: 'USER',
      rating: 1500,
      globalRank: 500,
      streak: 1,
      solvedProblemIds: [],
      solved: { total: 0, easy: 0, medium: 0, hard: 0 },
    });

    res.json({
      success: true,
      source: 'MongoDB',
      token: 'jwt-token-codingx-live-session',
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Registration Error: ${error.message}` });
  }
});

export default router;
