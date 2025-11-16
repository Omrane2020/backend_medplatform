const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Secretary', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    page: { type: DataTypes.STRING },
    Sidebar: { type: DataTypes.STRING },
    AppointmentsProps: { type: DataTypes.STRING },
    Appointments: { type: DataTypes.STRING },
    DashboardProps: { type: DataTypes.STRING },
    Dashboard: { type: DataTypes.STRING },
    PatientManagementProps: { type: DataTypes.STRING },
    PatientManagement: { type: DataTypes.STRING },
    currentPage: { type: DataTypes.STRING },
    SidebarProps: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    confirmPassword: { type: DataTypes.STRING },
    acceptTerms: { type: DataTypes.STRING },
  }, { timestamps: true });
};
