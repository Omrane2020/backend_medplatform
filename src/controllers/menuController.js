const { Menu } = require('../models');

exports.listMenus = async (req,res)=>{ 
  const list = await Menu.findAll(); 
  res.json(list); 
};
exports.createMenu = async (req,res)=>{ 
  const d = await Menu.create(req.body); 
  res.status(201).json(d); 
};
exports.getMenu = async (req,res)=>{ 
  const d = await Menu.findByPk(req.params.id); 
  if(!d) return res.status(404).json({message:'Not found'}); 
  res.json(d); 
};
exports.updateMenu = async (req,res)=>{ 
  const d = await Menu.findByPk(req.params.id); 
  if(!d) return res.status(404).json({message:'Not found'}); 
  await d.update(req.body); 
  res.json(d); 
};
exports.deleteMenu = async (req,res)=>{ 
  const d = await Menu.findByPk(req.params.id); 
  if(!d) return res.status(404).json({message:'Not found'}); 
  await d.destroy(); 
  res.json({message:'deleted'}); 
};
