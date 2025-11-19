// routes/logs.js
const express = require('express');
const router = express.Router();
const { listLogs, createLog } = require('../controllers/logController');
const { authenticate } = require('../middlewares/auth'); // ton middleware auth

router.get('/', authenticate, listLogs);
router.post('/', authenticate, createLog);

module.exports = router;
