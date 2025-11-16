const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Subscription', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    durationDays: { type: DataTypes.INTEGER, defaultValue: 30 },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { timestamps: true });
};
