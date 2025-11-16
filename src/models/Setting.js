const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Setting', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    key: { type: DataTypes.STRING, allowNull: false, unique: true },
    value: { type: DataTypes.TEXT, allowNull: true }
  }, { timestamps: true });
};
