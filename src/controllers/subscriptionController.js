const { Subscription } = require('../models');
exports.listSubs = async (req,res)=>{ const list = await Subscription.findAll(); res.json(list); };
exports.createSub = async (req,res)=>{ const s = await Subscription.create(req.body); res.status(201).json(s); };
exports.getSub = async (req,res)=>{ const s = await Subscription.findByPk(req.params.id); if(!s) return res.status(404).json({message:'Not found'}); res.json(s); };
exports.updateSub = async (req,res)=>{ const s = await Subscription.findByPk(req.params.id); if(!s) return res.status(404).json({message:'Not found'}); await s.update(req.body); res.json(s); };
exports.deleteSub = async (req,res)=>{ const s = await Subscription.findByPk(req.params.id); if(!s) return res.status(404).json({message:'Not found'}); await s.destroy(); res.json({message:'deleted'}); };
