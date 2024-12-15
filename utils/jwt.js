import jwt from 'jsonwebtoken';

/**
 * Create a JWT token
 * 
 * @param {Object} user - The user object to be included in the token
 * @returns {string} The generated JWT token
 */
export const generateToken = (user) => {
  const payload = {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
  };

  // Sign the JWT token with a secret key (you should store the secret key securely)
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '28d' });
};

/**
 * Verify the JWT token from the request header
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {void}
 */
export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is sent as "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    // Attach decoded user info to the request object
    req.user = decoded;
    next();
  });
};
