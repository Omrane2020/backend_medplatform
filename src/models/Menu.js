const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Menu', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Items: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    confirmPassword: { type: DataTypes.STRING },
    acceptTerms: { type: DataTypes.STRING },
  }, { timestamps: true });
};
