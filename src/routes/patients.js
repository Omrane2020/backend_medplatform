const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/auth');
const { listPatients, createPatient, getPatient, updatePatient, deletePatient } = require('../controllers/patientController');

router.get('/', authenticate, listPatients);
router.post('/', authenticate, authorizeRole(['admin']), createPatient);
router.get('/:id', authenticate, getPatient);
router.put('/:id', authenticate, authorizeRole(['admin']), updatePatient);
router.delete('/:id', authenticate, authorizeRole(['admin']), deletePatient);

module.exports = router;
