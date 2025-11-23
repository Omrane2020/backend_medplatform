const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

// Create a new prescription
router.post('/', prescriptionController.createPrescription);

// Get all prescriptions for a doctor
router.get('/doctor/:doctorId', prescriptionController.getPrescriptionsByDoctor);

// Update prescription
router.put('/:id', prescriptionController.updatePrescription);

// Delete prescription
router.delete('/:id', prescriptionController.deletePrescription);

// Get prescriptions for a specific patient
router.get('/patient/:patientId', prescriptionController.getPrescriptionsByPatient);


module.exports = router;
