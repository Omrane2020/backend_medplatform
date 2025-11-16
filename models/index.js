const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User")(sequelize, Sequelize.DataTypes);
const Subscription = require("./Subscription")(sequelize, Sequelize.DataTypes);
const Secretary = require("./Secretary")(sequelize, Sequelize.DataTypes);
const ActivityLog = require("./ActivityLog")(sequelize, Sequelize.DataTypes);
const Menu = require("./Menu")(sequelize, Sequelize.DataTypes);
const Patient = require("./Patient")(sequelize, Sequelize.DataTypes);
const Doctor = require("./Doctor")(sequelize, Sequelize.DataTypes);
const Setting = require("./Setting")(sequelize, Sequelize.DataTypes);

// Relations
User.hasMany(ActivityLog, { foreignKey: "userId" });
ActivityLog.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Subscription,
  Secretary,
  ActivityLog,
  Setting,
  Doctor,
  Patient,
  Menu
};
