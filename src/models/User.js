module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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

      specialty: {
        type: DataTypes.STRING,
        allowNull: true
      },

      role: {
        type: DataTypes.ENUM("doctor", "patient"),
        allowNull: false,
        defaultValue: "patient"
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: "users",
      timestamps: true
    }
  );

  return User;
};
