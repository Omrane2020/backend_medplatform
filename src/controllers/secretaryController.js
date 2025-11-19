const { Secretary } = require('../models');

// Liste des secrétaires
exports.listSecretaries = async (req, res) => {
  try {
    const list = await Secretary.findAll();
    res.json(list);
  } catch (error) {
    console.error('List secretaries error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Création d'un secrétaire
exports.createSecretary = async (req, res) => {
  try {
    const d = await Secretary.create(req.body);
    res.status(201).json(d);
  } catch (error) {
    console.error('Create secretary error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer un secrétaire
exports.getSecretary = async (req, res) => {
  try {
    const d = await Secretary.findByPk(req.params.id);
    if (!d) return res.status(404).json({ message: 'Not found' });
    res.json(d);
  } catch (error) {
    console.error('Get secretary error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Mettre à jour un secrétaire
exports.updateSecretary = async (req, res) => {
  try {
    const d = await Secretary.findByPk(req.params.id);
    if (!d) return res.status(404).json({ message: 'Not found' });
    await d.update(req.body);
    res.json(d);
  } catch (error) {
    console.error('Update secretary error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un secrétaire
exports.deleteSecretary = async (req, res) => {
  try {
    const d = await Secretary.findByPk(req.params.id);
    if (!d) return res.status(404).json({ message: 'Not found' });
    await d.destroy();
    res.json({ message: 'deleted' });
  } catch (error) {
    console.error('Delete secretary error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Activer / désactiver un secrétaire
exports.toggleSecretaryStatus = async (req, res) => {
  try {
    const secretary = await Secretary.findByPk(req.params.id);
    if (!secretary) return res.status(404).json({ message: 'Not found' });

    await secretary.update({ active: !secretary.active });

    res.json({
      message: `Statut ${secretary.active ? 'activé' : 'désactivé'}`,
      active: secretary.active
    });
  } catch (error) {
    console.error('Toggle secretary status error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.updateSecretaryPermissions = async (req, res) => {
  try {
    const secretary = await Secretary.findByPk(req.params.id);
    if (!secretary) return res.status(404).json({ message: 'Not found' });

    await secretary.update({ permissions: req.body.permissions });

    res.json({
      message: 'Permissions mises à jour',
      permissions: secretary.permissions
    });
  } catch (error) {
    console.error('Update secretary permissions error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
