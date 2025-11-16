const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/auth');

const {
  listUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Admin routes
router.get('/', authenticate, authorizeRole(['admin']), listUsers);
router.get('/:id', authenticate, authorizeRole(['admin']), getUser);
router.put('/:id', authenticate, authorizeRole(['admin']), updateUser);
router.delete('/:id', authenticate, authorizeRole(['admin']), deleteUser);

module.exports = router;
