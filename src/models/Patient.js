const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Patient', {

    // ✔ ID correct
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    // ✔ Informations générales
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },

    gender: { type: DataTypes.STRING },
    dateOfBirth: { type: DataTypes.STRING },

    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },

    address: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    postalCode: { type: DataTypes.STRING },

    // ✔ Informations médicales
    medicalHistory: { type: DataTypes.STRING },
    allergies: { type: DataTypes.STRING },
    currentMedications: { type: DataTypes.STRING },
    bloodType: { type: DataTypes.STRING },
    doctorNotes: { type: DataTypes.STRING },

    // ✔ Contacts d’urgence
    emergencyContact: { type: DataTypes.STRING },
    emergencyPhone: { type: DataTypes.STRING },

    // ✔ Rendez-vous et historique
    lastVisit: { type: DataTypes.STRING },
    nextAppointment: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },

    // ✔ Authentification
    password: { type: DataTypes.STRING },

    // ✔ Divers
    userType: { type: DataTypes.STRING },
    Plans: { type: DataTypes.STRING },

    // ✔ Données venant du JSON du front
    DashboardProps: { type: DataTypes.STRING },
    Dashboard: { type: DataTypes.STRING },
    HistoryProps: { type: DataTypes.STRING },
    History: { type: DataTypes.STRING },
    Info: { type: DataTypes.STRING },
    Data: { type: DataTypes.STRING },

    page: { type: DataTypes.STRING },

  }, { timestamps: true });
};
