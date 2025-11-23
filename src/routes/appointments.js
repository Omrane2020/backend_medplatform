// routes/appointments.ts
const express = require('express');
const Appointment = require('../models/Appointment');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Optional auth middleware for testing (replace with real JWT later)
const authMiddleware = (req, res, next) => {
  // Uncomment and implement JWT check in real app
  // const token = req.headers.authorization?.split(' ')[1];
  // if (!token) return res.status(401).json({ message: "Unauthorized" });
  next();
};

router.use(authMiddleware);

// Get all appointments
router.get('/', async (req, res) => {
  const appointments = await Appointment.findAll();
  res.json(appointments);
});

// Get appointments by date
router.get('/by-date/:date', async (req, res) => {
  const date = req.params.date;
  const appointments = await Appointment.findAll({ where: { date } });
  res.json(appointments);
});

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const { date, time, patient, type, status, duration, phone, email, notes } = req.body;

    const newAppointment = await Appointment.create({
      id: uuidv4(),
      date,
      time,
      patient,
      type,
      status: status || 'upcoming', // default to upcoming
      duration,
      phone,
      email,
      notes
    });

    res.json(newAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du rendez-vous' });
  }
});

module.exports = router;
