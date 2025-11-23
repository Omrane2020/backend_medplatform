const { Prescription } = require('../models');

module.exports = {
  // Add prescription
  createPrescription: async (req, res) => {
    try {
      const { patientId, doctorId, content, notes } = req.body;
      const prescription = await Prescription.create({ patientId, doctorId, content, notes });
      res.status(201).json(prescription);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating prescription' });
    }
  },

  // Get all prescriptions for a doctor
  getPrescriptionsByDoctor: async (req, res) => {
    try {
      const doctorId = req.params.doctorId;
      const prescriptions = await Prescription.findAll({ where: { doctorId } });
      res.status(200).json(prescriptions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching prescriptions' });
    }
  },

  // Update a prescription
  updatePrescription: async (req, res) => {
    try {
      const { id } = req.params;
      const { content, notes } = req.body;
      const prescription = await Prescription.findByPk(id);

      if (!prescription) return res.status(404).json({ message: 'Prescription not found' });

      prescription.content = content ?? prescription.content;
      prescription.notes = notes ?? prescription.notes;

      await prescription.save();
      res.status(200).json(prescription);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating prescription' });
    }
  },

  // Delete a prescription
  deletePrescription: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Prescription.destroy({ where: { id } });
      if (!deleted) return res.status(404).json({ message: 'Prescription not found' });
      res.status(200).json({ message: 'Prescription deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting prescription' });
    }
  },

    // Get all prescriptions for a specific patient
  getPrescriptionsByPatient: async (req, res) => {
  try {
    // Parse patientId as integer
    const patientId = parseInt(req.params.patientId, 10);
    if (isNaN(patientId)) {
      return res.status(400).json({ message: 'Invalid patientId' });
    }

    console.log('Fetching prescriptions for patientId:', patientId);

    // Fetch prescriptions, latest first
    const prescriptions = await Prescription.findAll({
      where: { patientId },
      order: [['createdAt', 'DESC']], // works if timestamps: true
    });

    // If none found, return empty array
    res.status(200).json(prescriptions || []);
  } catch (err) {
    console.error('Error fetching prescriptions:', err);
    res.status(500).json({ message: 'Error fetching prescriptions' });
  }
}


};
