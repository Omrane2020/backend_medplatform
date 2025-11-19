const { Subscription } = require('../models');

exports.listSubscriptions = async (req, res) => {
  try {
    const { category } = req.query;
    const where = {};
    
    if (category && category !== 'all') {
      where.category = category;
    }

    const subscriptions = await Subscription.findAll({ 
      where,
      order: [['order', 'ASC']] 
    });
    
    res.json(subscriptions);
  } catch (error) {
    console.error('List subscriptions error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByPk(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Abonnement non trouvé' });
    }
    res.json(subscription);
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.createSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.create(req.body);
    res.status(201).json(subscription);
  } catch (error) {
    console.error('Create subscription error:', error);
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Données invalides', 
        errors: error.errors.map(e => e.message) 
      });
    }
    
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByPk(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Abonnement non trouvé' });
    }

    await subscription.update(req.body);
    res.json(subscription);
  } catch (error) {
    console.error('Update subscription error:', error);
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Données invalides', 
        errors: error.errors.map(e => e.message) 
      });
    }
    
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByPk(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Abonnement non trouvé' });
    }

    await subscription.destroy();
    res.json({ message: 'Abonnement supprimé avec succès' });
  } catch (error) {
    console.error('Delete subscription error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.toggleSubscriptionStatus = async (req, res) => {
  try {
    const subscription = await Subscription.findByPk(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Abonnement non trouvé' });
    }

    await subscription.update({ active: !subscription.active });
    res.json({ 
      message: `Abonnement ${subscription.active ? 'activé' : 'désactivé'}`, 
      active: subscription.active 
    });
  } catch (error) {
    console.error('Toggle subscription error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};