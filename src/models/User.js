// models/User.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('patient', 'doctor', 'admin'),
      defaultValue: 'patient'
    }
  }, {
    timestamps: true,
    tableName: 'Users'
  });

  User.associate = function(models) {
    User.hasOne(models.Doctor, { foreignKey: 'userId', as: 'doctor' });
    User.hasOne(models.Patient, { foreignKey: 'userId', as: 'patient' });
  };

  return User;
};