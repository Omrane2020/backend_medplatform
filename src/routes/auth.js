const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { register } = require('../controllers/userController');

// Public auth routes
router.post('/signup', register);
router.post('/login', login);

module.exports = router;