const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/auth');
const { listDoctors, createDoctor, getDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController');

router.get('/', authenticate, listDoctors);
router.post('/', authenticate, authorizeRole(['admin']), createDoctor);
router.get('/:id', authenticate, getDoctor);
router.put('/:id', authenticate, authorizeRole(['admin']), updateDoctor);
router.delete('/:id', authenticate, authorizeRole(['admin']), deleteDoctor);

module.exports = router;
