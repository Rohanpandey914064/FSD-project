import express from 'express';
import { User } from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * ── POST /api/auth/register ──
 * Register a new user with bcrypt password hashing and JWT issuance
 */
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username, email, and password',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // 2. Check existing user
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists',
      });
    }

    const existingUsername = await User.findOne({ username: username.trim() });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: 'This username is already taken. Please choose another.',
      });
    }

    // 3. Create user (password is automatically hashed by pre-save hook)
    const userId = `usr_${Date.now()}`;
    const user = await User.create({
      userId,
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: 'USER',
      rating: 1500,
      globalRank: 350,
      streak: 1,
      solvedProblemIds: [],
      solved: { total: 0, easy: 0, medium: 0, hard: 0 },
      recentSubmissions: [],
    });

    // 4. Generate JWT Token
    const token = generateToken(user.userId, user.role);

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user,
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({
      success: false,
      message: `Registration failed: ${error.message}`,
    });
  }
});

/**
 * ── POST /api/auth/login ──
 * Authenticate user credentials and return JWT token
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare bcrypt password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate JWT Token
    const token = generateToken(user.userId, user.role);

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user,
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: `Login failed: ${error.message}`,
    });
  }
});

/**
 * ── GET /api/auth/me ──
 * Fetch the currently authenticated user session via JWT token
 */
router.get('/me', optionalAuth, async (req, res) => {
  try {
    // If authenticated via Bearer token, return that user
    if (req.user) {
      return res.json({
        success: true,
        authenticated: true,
        source: 'MongoDB (JWT Verified)',
        user: req.user,
      });
    }

    // Demo fallback for initial page render before login
    let defaultUser = await User.findOne({ email: 'developer@codingx.com' });
    if (!defaultUser) {
      defaultUser = await User.findOne();
    }

    res.json({
      success: true,
      authenticated: false,
      source: 'MongoDB (Guest Mode)',
      user: defaultUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to fetch user session: ${error.message}`,
    });
  }
});

/**
 * ── POST /api/auth/logout ──
 * Client-side token invalidation confirmation
 */
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully. Token cleared.',
  });
});

export default router;
