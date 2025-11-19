// controllers/logController.js
const { ActivityLog, User } = require('../models');

// Liste des logs avec utilisateur
exports.listLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email', 'role'] }],
      order: [['createdAt', 'DESC']],
      limit: 50
    });
    res.json(logs);
  } catch (err) {
    console.error('Erreur récupération logs :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Création d’un log
exports.createLog = async (req, res) => {
  try {
    const { type, action, status, meta } = req.body;

    if (!type || !action || !status) {
      return res.status(400).json({ message: 'Champs manquants' });
    }

    const log = await ActivityLog.create({
      user_id: req.user.id, // req.user défini par ton middleware auth
      type,
      action,
      status,
      meta: meta || null
    });

    res.status(201).json(log);
  } catch (err) {
    console.error('Erreur création log :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
