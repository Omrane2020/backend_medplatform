const express = require('express');
const router = express.Router(); 
const { ActivityLog } = require('../models');

router.post("/", async (req, res) => {
  try {
    const { userId, type, action, status } = req.body;

    if (!userId || !action || !status) {
      return res.status(400).json({ error: "userId, action et status sont requis" });
    }

    // Créer le log dans la base
    const log = await ActivityLog.create({
      user_id: userId,
      type: type || "system",
      action,
      status
    });

    res.json({
      message: "Activity saved successfully",
      data: log
    });
  } catch (err) {
    console.error("Erreur en sauvegardant l'activité:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Optionnel : récupérer les logs
router.get("/", async (req, res) => {
  try {
    const logs = await ActivityLog.findAll({ order: [['createdAt', 'DESC']], limit: 50 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router; // <-- indispensable
