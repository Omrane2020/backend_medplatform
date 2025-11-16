const { ActivityLog } = require('../models');
exports.listLogs = async (req,res)=>{ const logs = await ActivityLog.findAll({ include: ['User'] }); res.json(logs); };
exports.createLog = async (req,res)=>{ const l = await ActivityLog.create({ action: req.body.action, meta: req.body.meta, userId: req.user.id }); res.status(201).json(l); };
