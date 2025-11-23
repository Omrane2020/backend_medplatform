module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('Doctor', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
      onDelete: 'CASCADE'
    },
    specialty: DataTypes.STRING,
    licenseNumber: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    consultationFee: DataTypes.DECIMAL(10, 2),
    availability: { type: DataTypes.BOOLEAN, defaultValue: true },
    rating: DataTypes.DECIMAL(3, 2),
    bio: DataTypes.TEXT
  }, {
    tableName: 'Doctors',
    timestamps: true
  });

  Doctor.associate = (models) => {
    Doctor.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Doctor;
};
