const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Prescription = sequelize.define('Prescription', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Patients', key: 'id' },
      onDelete: 'CASCADE',
    },

    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Doctors', key: 'id' },
      onDelete: 'CASCADE',
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: true,
    tableName: 'Prescriptions',
  });

  Prescription.associate = (models) => {
    Prescription.belongsTo(models.Patient, { foreignKey: 'patientId', as: 'patient' });
    Prescription.belongsTo(models.Doctor, { foreignKey: 'doctorId', as: 'doctor' });
  };

  return Prescription;
};
