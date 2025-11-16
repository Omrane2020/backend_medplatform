const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/auth');
const { listSettings, upsertSetting } = require('../controllers/settingController');

router.get('/', authenticate, listSettings);
router.post('/', authenticate, authorizeRole(['admin']), upsertSetting);

module.exports = router;
