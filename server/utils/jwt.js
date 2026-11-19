import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'codingx_super_secure_jwt_secret_key_2026';

/**
 * Generate a signed JWT token containing userId
 * @param {string} userId - User identifier
 * @param {string} role - User role (USER / ADMIN)
 * @returns {string} Signed JSON Web Token
 */
export const generateToken = (userId, role = 'USER') => {
  return jwt.sign(
    { id: userId, role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

/**
 * Verify and decode a JWT token
 * @param {string} token - Bearer token
 * @returns {object} Decoded payload
 */
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export default { generateToken, verifyToken };
