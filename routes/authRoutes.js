const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../utils/validator')

router.post('/register', [
  body('username').not().isEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  validate
], authController.register);

router.post('/login', [
  body('usernameOrEmail').not().isEmpty().withMessage('Username or Email is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
  validate
], authController.login);

// Other routes...

  

// Other routes...

module.exports = router