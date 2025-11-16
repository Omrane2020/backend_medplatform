const { Doctor } = require('../models');

exports.listDoctors = async (req,res)=>{ 
  const list = await Doctor.findAll(); 
  res.json(list); 
};
exports.createDoctor = async (req,res)=>{ 
  const d = await Doctor.create(req.body); 
  res.status(201).json(d); 
};
exports.getDoctor = async (req,res)=>{ 
  const d = await Doctor.findByPk(req.params.id); 
  if(!d) return res.status(404).json({message:'Not found'}); 
  res.json(d); 
};
exports.updateDoctor = async (req,res)=>{ 
  const d = await Doctor.findByPk(req.params.id); 
  if(!d) return res.status(404).json({message:'Not found'}); 
  await d.update(req.body); 
  res.json(d); 
};
exports.deleteDoctor = async (req,res)=>{ 
  const d = await Doctor.findByPk(req.params.id); 
  if(!d) return res.status(404).json({message:'Not found'}); 
  await d.destroy(); 
  res.json({message:'deleted'}); 
};
