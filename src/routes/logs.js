const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const { listLogs, createLog } = require('../controllers/logController');

router.get('/', authenticate, listLogs);
router.post('/', authenticate, createLog);

module.exports = router;
