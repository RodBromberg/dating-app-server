// /controllers/authController.js
const User = require('../models/user/user.js');
const { generateToken } = require('../utils/jwtUtils.js')

exports.register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

exports.login = async (req, res, next) => {
    const { usernameOrEmail, password } = req.body;
    try {
      // Check if a user with the provided username or email exists in the database
      const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
      if (!user) {
        return res.status(401).json({ message: "Invalid username/email or password" });
      }
  
      // Check if the password is correct
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username/email or password" });
      }
  
      // If everything is correct, generate a JWT token and send it in the response
      const token = generateToken(user);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };