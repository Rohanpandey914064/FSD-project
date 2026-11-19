import { verifyToken } from '../utils/jwt.js';
import { User } from '../models/User.js';

/**
 * Protect routes by verifying JWT Token (Cookie or Bearer header)
 */
export const protect = async (req, res, next) => {
  let token;

  // 1. Check HTTP-Only Cookie first
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // 2. Fallback to Authorization: Bearer <token> for Postman / API clients
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No session cookie or authorization token provided.',
    });
  }

  try {
    const decoded = verifyToken(token);

    // Find user from database
    const user = await User.findOne({ userId: decoded.id });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User belonging to this session no longer exists.',
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error('Cookie/JWT Auth Error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session. Please log in again.',
    });
  }
};

/**
 * Optional authentication: Attaches user if cookie or token is present
 */
export const optionalAuth = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = verifyToken(token);
      req.user = await User.findOne({ userId: decoded.id });
    } catch {
      req.user = null;
    }
  }

  next();
};

export default { protect, optionalAuth };
