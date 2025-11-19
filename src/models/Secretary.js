module.exports = (sequelize, DataTypes) => {
  const Secretary = sequelize.define(
    "Secretary",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
      },
      permissions: {
        type: DataTypes.JSON,
        defaultValue: {
          patientManagement: false,
          appointmentManagement: false,
          patientView: false,
          notifications: false
        }
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "secretaries",
      timestamps: true
    }
  );

  return Secretary;
};