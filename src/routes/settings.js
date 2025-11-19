const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/auth');
const { getSettings, updateSettings } = require('../controllers/settingController');

router.get('/', authenticate, getSettings);
router.post('/', authenticate, authorizeRole(['admin']), updateSettings);

module.exports = router;
