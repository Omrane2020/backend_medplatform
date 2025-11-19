const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/auth');
const { 
  listSubscriptions, 
  createSubscription, 
  getSubscription, 
  updateSubscription, 
  deleteSubscription,
  toggleSubscriptionStatus // Add this import
} = require('../controllers/subscriptionController');

router.get('/', authenticate, listSubscriptions);
router.post('/', authenticate, authorizeRole(['admin']), createSubscription);
router.get('/:id', authenticate, getSubscription);
router.put('/:id', authenticate, authorizeRole(['admin']), updateSubscription);
router.delete('/:id', authenticate, authorizeRole(['admin']), deleteSubscription);
router.patch('/:id/toggle', authenticate, authorizeRole(['admin']), toggleSubscriptionStatus); // Add this route

module.exports = router;