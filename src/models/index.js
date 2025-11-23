const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

// Initialize models
db.User = require("./User")(sequelize, Sequelize.DataTypes);
db.Subscription = require("./Subscription")(sequelize, Sequelize.DataTypes);
db.Secretary = require("./Secretary")(sequelize, Sequelize.DataTypes);
db.ActivityLog = require("./ActivityLog")(sequelize, Sequelize.DataTypes);
db.Menu = require("./Menu")(sequelize, Sequelize.DataTypes);
db.Patient = require("./Patient")(sequelize, Sequelize.DataTypes);
db.Doctor = require("./Doctor")(sequelize, Sequelize.DataTypes);
db.Setting = require("./Setting")(sequelize, Sequelize.DataTypes);
db.Prescription = require("./Prescription")(sequelize, Sequelize.DataTypes);

// Run associations if present
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// EXTRA Associations if needed (can stay)
db.User.hasMany(db.ActivityLog, { foreignKey: "userId" });
db.ActivityLog.belongsTo(db.User, { foreignKey: "userId" });

module.exports = {
  ...db,
  sequelize,
  Sequelize,
};
