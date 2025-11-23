// models/Appointment.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Appointment extends Model {}

Appointment.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    patient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('upcoming', 'completed', 'cancelled', 'in-progress'),
      defaultValue: 'upcoming'
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    notes: {
      type: DataTypes.TEXT
    }
  },
  {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments',
    timestamps: true
  }
);

module.exports = Appointment;
