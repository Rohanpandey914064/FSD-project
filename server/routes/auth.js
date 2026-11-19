import express from 'express';

const router = express.Router();

// Mock User Session
const demoUser = {
  id: "usr_9912",
  username: "rohan_coder",
  email: "developer@codingx.com",
  role: "USER",
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
    { problem: "Two Sum", status: "Accepted", lang: "JavaScript", time: "2 hours ago" },
    { problem: "Valid Parentheses", status: "Accepted", lang: "Python", time: "Yesterday" },
    { problem: "Min Stack", status: "Accepted", lang: "C++", time: "3 days ago" },
  ]
};

router.get('/me', (req, res) => {
  res.json({ success: true, user: demoUser });
});

router.post('/login', (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    token: "mock-jwt-token-codingx-showcase-12345",
    user: { ...demoUser, email: email || demoUser.email },
  });
});

router.post('/register', (req, res) => {
  const { username, email } = req.body;
  res.json({
    success: true,
    token: "mock-jwt-token-codingx-showcase-12345",
    user: { ...demoUser, username: username || demoUser.username, email: email || demoUser.email },
  });
});

export default router;
