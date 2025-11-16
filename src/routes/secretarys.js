const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/auth');
const { listSecretarys, createSecretary, getSecretary, updateSecretary, deleteSecretary } = require('../controllers/secretaryController');

router.get('/', authenticate, listSecretarys);
router.post('/', authenticate, authorizeRole(['admin']), createSecretary);
router.get('/:id', authenticate, getSecretary);
router.put('/:id', authenticate, authorizeRole(['admin']), updateSecretary);
router.delete('/:id', authenticate, authorizeRole(['admin']), deleteSecretary);

module.exports = router;
