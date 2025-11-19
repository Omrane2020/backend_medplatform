// models/Doctor.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Doctor = sequelize.define('Doctor', {
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

    specialty: {
      type: DataTypes.STRING,
      allowNull: true
    },
    
    // Ajouter d'autres champs spécifiques au médecin
    licenseNumber: { type: DataTypes.STRING },
    experience: { type: DataTypes.INTEGER }, // années d'expérience
    consultationFee: { type: DataTypes.DECIMAL(10, 2) },
    availability: { type: DataTypes.BOOLEAN, defaultValue: true },
    rating: { type: DataTypes.DECIMAL(3, 2) },
    bio: { type: DataTypes.TEXT }

    // SUPPRIMER : page, currentPage (ce sont des champs frontend)
  }, { 
    timestamps: true,
    tableName: 'Doctors'
  });

  return Doctor;
};