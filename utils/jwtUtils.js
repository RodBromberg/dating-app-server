// /utils/jwtUtils.js
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in your .env file');
  }

  return jwt.sign(
    {
      id: user._id, // Use the MongoDB user ID as the subject of the JWT
      // You could add additional claims here, if needed
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h' // The token will expire in 1 hour
    }
  );
};

module.exports = {
  generateToken
};
