const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/auth');
const { listSubs, createSub, getSub, updateSub, deleteSub } = require('../controllers/subscriptionController');

router.get('/', authenticate, listSubs);
router.post('/', authenticate, authorizeRole(['admin']), createSub);
router.get('/:id', authenticate, getSub);
router.put('/:id', authenticate, authorizeRole(['admin']), updateSub);
router.delete('/:id', authenticate, authorizeRole(['admin']), deleteSub);

module.exports = router;
