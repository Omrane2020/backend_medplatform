// models/Patient.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Patient = sequelize.define('Patient', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    
    // Lien avec User
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
      onDelete: 'CASCADE'
    },

    // Supprimer les champs qui existent déjà dans User
    age: { type: DataTypes.INTEGER },
    gender: { type: DataTypes.STRING },
    dateOfBirth: { type: DataTypes.DATE },
    address: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    postalCode: { type: DataTypes.STRING },
    medicalHistory: { type: DataTypes.TEXT },
    allergies: { type: DataTypes.TEXT },
    currentMedications: { type: DataTypes.TEXT },
    bloodType: { type: DataTypes.STRING },
    doctorNotes: { type: DataTypes.TEXT },
    emergencyContact: { type: DataTypes.STRING },
    emergencyPhone: { type: DataTypes.STRING },
    lastVisit: { type: DataTypes.DATE },
    nextAppointment: { type: DataTypes.DATE },
    status: { 
      type: DataTypes.STRING,
      defaultValue: 'active'
    }

    // SUPPRIMER tous ces champs qui sont dans User :
    // firstName, lastName, email, phone, password, userType, etc.
  }, { 
    timestamps: true,
    tableName: 'Patients'
  });

  return Patient;
};