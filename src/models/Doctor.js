const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Doctor', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    page: { type: DataTypes.STRING },
    currentPage: { type: DataTypes.STRING }
  }, { timestamps: true });
};
