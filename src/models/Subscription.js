module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define(
    "Subscription",
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      category: {
        type: DataTypes.ENUM('doctor', 'clinic', 'patient'),
        allowNull: false
      },
      monthlyPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      yearlyPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      features: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
      },
      popular: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      color: {
        type: DataTypes.STRING,
        defaultValue: 'blue'
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: "subscriptions",
      timestamps: true
    }
  );

  return Subscription;
};