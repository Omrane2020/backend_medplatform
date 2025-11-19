const { Setting } = require('../models');

exports.getSettings = async (req, res) => {
  try {
    const { category } = req.query;
    const where = {};
    
    if (category) {
      where.category = category;
    }

    const settings = await Setting.findAll({ where });
    
    // Transformer en objet clé-valeur
    const settingsObj = {};
    settings.forEach(setting => {
      let value = setting.value;
      
      // Convertir selon le type
      switch (setting.type) {
        case 'number':
          value = Number(value);
          break;
        case 'boolean':
          value = value === 'true';
          break;
        case 'json':
          try {
            value = JSON.parse(value);
          } catch {
            value = value;
          }
          break;
        default:
          value = value;
      }
      
      settingsObj[setting.key] = value;
    });

    res.json(settingsObj);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const settings = req.body;
    
    for (const [key, value] of Object.entries(settings)) {
      const setting = await Setting.findOne({ where: { key } });
      
      let stringValue;
      let type = 'string';
      
      // Déterminer le type et convertir en string
      if (typeof value === 'boolean') {
        stringValue = value.toString();
        type = 'boolean';
      } else if (typeof value === 'number') {
        stringValue = value.toString();
        type = 'number';
      } else if (typeof value === 'object') {
        stringValue = JSON.stringify(value);
        type = 'json';
      } else {
        stringValue = value;
      }

      if (setting) {
        await setting.update({ value: stringValue, type });
      } else {
        // Créer un nouveau setting si il n'existe pas
        await Setting.create({
          key,
          value: stringValue,
          type,
          category: 'general',
          description: `Paramètre ${key}`
        });
      }
    }

    res.json({ message: 'Paramètres mis à jour avec succès' });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.initializeDefaultSettings = async (req, res) => {
  try {
    const defaultSettings = [
      {
        key: 'systemName',
        value: 'MediCare Platform',
        type: 'string',
        category: 'general',
        description: 'Nom du système'
      },
      {
        key: 'systemDescription',
        value: 'Plateforme médicale numérique',
        type: 'string',
        category: 'general',
        description: 'Description du système'
      },
      {
        key: 'timezone',
        value: 'Europe/Paris',
        type: 'string',
        category: 'general',
        description: 'Fuseau horaire'
      },
      {
        key: 'sessionTimeout',
        value: '30',
        type: 'number',
        category: 'security',
        description: 'Timeout de session en minutes'
      },
      {
        key: 'passwordMinLength',
        value: '8',
        type: 'number',
        category: 'security',
        description: 'Longueur minimale du mot de passe'
      }
    ];

    for (const setting of defaultSettings) {
      await Setting.findOrCreate({
        where: { key: setting.key },
        defaults: setting
      });
    }

    res.json({ message: 'Paramètres par défaut initialisés' });
  } catch (error) {
    console.error('Initialize settings error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};