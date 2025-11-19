require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');

// Routes import
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const subRoutes = require('./routes/subscriptions');
const secretaryRoutes = require('./routes/secretaries');
const settingsRoutes = require('./routes/settings');
const reportsRoutes = require('./routes/reports');
const doctorRoutes = require('./routes/doctors');
const menuRoutes = require('./routes/menus');
const patientRoutes = require('./routes/patients');
const logsRoutes = require('./routes/logs');
const activityRoutes = require('./routes/activity');
const adminRoutes = require('./routes/admin');
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// --- Public routes ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subRoutes);
app.use('/api/secretaries', secretaryRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/logs', logsRoutes);


// --- ADMIN ROUTES (toujours à la fin !) ---
app.use('/api/admin', adminRoutes);

// --- Lancement serveur ---
const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    await sequelize.sync({ alter: true });
    console.log('Database synced');

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
}

start();
