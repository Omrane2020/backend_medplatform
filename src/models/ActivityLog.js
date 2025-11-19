// models/ActivityLog.js
module.exports = (sequelize, DataTypes) => {
  const ActivityLog = sequelize.define('ActivityLog', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    meta: { type: DataTypes.JSON, allowNull: true },
  }, { timestamps: true ,
   tableName: 'activitylogs'
});
  ActivityLog.associate = models => {
    ActivityLog.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return ActivityLog;
};
