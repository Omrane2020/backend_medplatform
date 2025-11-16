require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');

// Route imports
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const subRoutes = require('./routes/subscriptions');
const secretaryRoutes = require('./routes/secretaries');
const logsRoutes = require('./routes/logs');
const settingsRoutes = require('./routes/settings');
const reportsRoutes = require('./routes/reports');
const doctorRoutes = require('./routes/doctors');
const menuRoutes = require('./routes/menus');
const patientRoutes = require('./routes/patients');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Fixed Route mounting - NO DUPLICATES
app.use('/api/auth', authRoutes);          // Authentication routes (login, signup)
app.use('/api/users', userRoutes);         // User management routes
app.use('/api/subscriptions', subRoutes);
app.use('/api/secretaries', secretaryRoutes);
app.use('/api/logs', logsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);

// Remove this duplicate line: app.use('/api/secretarys', secretaryRoutes);

const PORT = process.env.PORT || 4000;

async function start(){
  try{
    await sequelize.authenticate();
    console.log('DB connected');
    await sequelize.sync({ alter: true });
    console.log('Database synced');
    app.listen(PORT, ()=>console.log('Server running on', PORT));
  }catch(err){
    console.error('Startup error:', err);
    process.exit(1);
  }
}

start();