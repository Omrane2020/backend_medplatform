const { User, ActivityLog, Subscription, Secretary, Setting } = require('../models');
const bcrypt = require('bcrypt');

// Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalDoctors = await User.count({ where: { role: 'doctor' } });
    const totalPatients = await User.count({ where: { role: 'patient' } });
    const totalSecretaries = await Secretary.count();
    const activeSubscriptions = await Subscription.count({ where: { active: true } });
    
    // Récupérer les logs récents
    const recentActivities = await ActivityLog.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [{ model: User, attributes: ['firstName', 'lastName', 'email'] }]
    });

    res.json({
      stats: {
        totalUsers,
        totalDoctors,
        totalPatients,
        totalSecretaries,
        activeSubscriptions,
        systemHealth: 98.5,
        activeSessions: Math.floor(Math.random() * 50) + 20
      },
      recentActivities,
      systemMetrics: [
        { label: 'CPU', value: 45, status: 'good' },
        { label: 'Mémoire', value: 62, status: 'warning' },
        { label: 'Stockage', value: 78, status: 'warning' },
        { label: 'Réseau', value: 23, status: 'good' }
      ]
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Gestion des logs d'activité
exports.getActivityLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50, search, user, action, date } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (user && user !== 'all') where.userId = user;
    if (action && action !== 'all') where.action = action;

    const logs = await ActivityLog.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      include: [{ model: User, attributes: ['firstName', 'lastName', 'email', 'role'] }]
    });

    res.json({
      logs: logs.rows,
      total: logs.count,
      page: parseInt(page),
      totalPages: Math.ceil(logs.count / limit)
    });
  } catch (error) {
    console.error('Activity logs error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Exporter les logs
exports.exportActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.findAll({
      include: [{ model: User, attributes: ['firstName', 'lastName', 'email', 'role'] }],
      order: [['createdAt', 'DESC']]
    });

    // Format pour l'export CSV
    const csvData = logs.map(log => ({
      Date: log.createdAt.toISOString(),
      Utilisateur: log.User ? `${log.User.firstName} ${log.User.lastName}` : 'Système',
      Email: log.User?.email || 'Système',
      Rôle: log.User?.role || 'system',
      Action: log.action,
      Détails: JSON.stringify(log.meta)
    }));

    res.json(csvData);
  } catch (error) {
    console.error('Export logs error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
// Exemple simple pour recent-activity
exports.getRecentActivity = async (req, res) => {
  const { period } = req.query;

  let logs = await ActivityLog.findAll({
    order: [['createdAt', 'DESC']],
    limit: 20 // par exemple les 20 derniers logs
  });

  const now = new Date();

  if (period === 'today') {
    logs = logs.filter(log => new Date(log.timestamp).toDateString() === now.toDateString());
  } else if (period === 'week') {
    const firstDay = new Date(now.setDate(now.getDate() - now.getDay()));
    const lastDay = new Date(firstDay);
    lastDay.setDate(firstDay.getDate() + 6);
    logs = logs.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate >= firstDay && logDate <= lastDay;
    });
  } else if (period === 'month') {
    logs = logs.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate.getMonth() === now.getMonth() && logDate.getFullYear() === now.getFullYear();
    });
  }

  res.json(logs);
};

exports.getSystemMetrics = async (req, res) => {
  try {
    const metrics = [
      { label: 'CPU', value: 45, status: 'good' },
      { label: 'Mémoire', value: 62, status: 'warning' },
      { label: 'Stockage', value: 78, status: 'warning' },
      { label: 'Réseau', value: 23, status: 'good' }
    ];
    res.json(metrics);
  } catch (error) {
    console.error('System metrics error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


