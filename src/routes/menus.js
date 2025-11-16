const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/auth');
const { listMenus, createMenu, getMenu, updateMenu, deleteMenu } = require('../controllers/menuController');

router.get('/', authenticate, listMenus);
router.post('/', authenticate, authorizeRole(['admin']), createMenu);
router.get('/:id', authenticate, getMenu);
router.put('/:id', authenticate, authorizeRole(['admin']), updateMenu);
router.delete('/:id', authenticate, authorizeRole(['admin']), deleteMenu);

module.exports = router;
