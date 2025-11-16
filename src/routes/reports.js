const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/auth');
const { generateReport } = require('../controllers/reportController');

router.get('/generate', authenticate, authorizeRole(['admin']), generateReport);

module.exports = router;
