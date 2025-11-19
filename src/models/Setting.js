module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define(
    "Setting",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('string', 'number', 'boolean', 'json'),
        defaultValue: 'string'
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: "settings",
      timestamps: true
    }
  );

  return Setting;
};