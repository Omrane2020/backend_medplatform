const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('ActivityLog', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    action: { type: DataTypes.STRING, allowNull: false },
    meta: { type: DataTypes.JSON, allowNull: true }
  }, { timestamps: true });
};
