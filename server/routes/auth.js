import express from 'express';
import mongoose from 'mongoose';
import { User } from '../models/User.js';

const router = express.Router();

const isDbConnected = () => mongoose.connection.readyState === 1;

// Fallback demo user
const fallbackUser = {
  id: 'usr_9912',
  username: 'rohan_coder',
  email: 'developer@codingx.com',
  role: 'USER',
  rating: 1845,
  globalRank: 142,
  streak: 7,
  solved: {
    total: 24,
    easy: 15,
    medium: 7,
    hard: 2,
  },
  recentSubmissions: [
    { problem: 'Two Sum', status: 'Accepted', lang: 'JavaScript', time: '2 hours ago' },
    { problem: 'Valid Parentheses', status: 'Accepted', lang: 'Python', time: 'Yesterday' },
    { problem: 'Min Stack', status: 'Accepted', lang: 'C++', time: '3 days ago' },
  ],
};

router.get('/me', async (req, res) => {
  try {
    if (isDbConnected()) {
      let user = await User.findOne({ userId: 'usr_9912' }).lean();
      if (user) {
        return res.json({ success: true, source: 'MongoDB', user });
      }
    }
    res.json({ success: true, source: 'In-Memory', user: fallbackUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    token: 'mock-jwt-token-codingx-showcase-12345',
    user: { ...fallbackUser, email: email || fallbackUser.email },
  });
});

router.post('/register', async (req, res) => {
  const { username, email } = req.body;
  res.json({
    success: true,
    token: 'mock-jwt-token-codingx-showcase-12345',
    user: {
      ...fallbackUser,
      username: username || fallbackUser.username,
      email: email || fallbackUser.email,
    },
  });
});

export default router;
