const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/auth');

const adminController = require('../controllers/adminController');
const subscriptionController = require('../controllers/subscriptionController');
const secretaryController = require('../controllers/secretaryController');
const settingsController = require('../controllers/settingController');
const userController = require('../controllers/userController');

// Toutes les routes nécessitent une authentification
router.use(authenticate);

// ----- Dashboard -----
router.get('/dashboard/stats', adminController.getDashboardStats);
// ----- Dashboard récent activité -----
router.get('/dashboard/recent-activity', adminController.getRecentActivity);
// Metrics système
router.get('/dashboard/system-metrics', adminController.getSystemMetrics);

// ----- Logs -----
router.get('/activity-logs', adminController.getActivityLogs);
router.get('/activity-logs/export', adminController.exportActivityLogs);

// ----- Abonnements -----
router.get('/subscriptions', subscriptionController.listSubscriptions);
router.get('/subscriptions/:id', subscriptionController.getSubscription);
router.post('/subscriptions', authorizeRole('admin'), subscriptionController.createSubscription);
router.put('/subscriptions/:id', authorizeRole('admin'), subscriptionController.updateSubscription);
router.delete('/subscriptions/:id', authorizeRole('admin'), subscriptionController.deleteSubscription);
router.patch('/subscriptions/:id/toggle', authorizeRole('admin'), subscriptionController.toggleSubscriptionStatus);

// ----- Secrétaires -----
router.get('/secretaries', secretaryController.listSecretaries);
router.post('/secretaries', authorizeRole('admin'), secretaryController.createSecretary);
router.put('/secretaries/:id', authorizeRole('admin'), secretaryController.updateSecretary);
router.delete('/secretaries/:id', authorizeRole('admin'), secretaryController.deleteSecretary);
router.patch('/secretaries/:id/toggle-status', authorizeRole('admin'), secretaryController.toggleSecretaryStatus);
router.patch('/secretaries/:id/permissions', authorizeRole('admin'), secretaryController.updateSecretaryPermissions);

// ----- Paramètres système -----
router.get('/settings', settingsController.getSettings);
router.put('/settings', authorizeRole('admin'), settingsController.updateSettings);
router.post('/settings/initialize', authorizeRole('admin'), settingsController.initializeDefaultSettings);

// ----- Utilisateurs -----
router.get('/users', userController.listUsers);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', authorizeRole('admin'), userController.updateUser);
router.delete('/users/:id', authorizeRole('admin'), userController.deleteUser);

module.exports = router;
