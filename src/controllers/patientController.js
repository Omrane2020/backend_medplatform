const { Patient } = require('../models');

exports.listPatients = async (req,res)=>{ 
  const list = await Patient.findAll(); 
  res.json(list); 
};
exports.createPatient = async (req,res)=>{ 
  const d = await Patient.create(req.body); 
  res.status(201).json(d); 
};
exports.getPatient = async (req,res)=>{ 
  const d = await Patient.findByPk(req.params.id); 
  if(!d) return res.status(404).json({message:'Not found'}); 
  res.json(d); 
};
exports.updatePatient = async (req,res)=>{ 
  const d = await Patient.findByPk(req.params.id); 
  if(!d) return res.status(404).json({message:'Not found'}); 
  await d.update(req.body); 
  res.json(d); 
};
exports.deletePatient = async (req,res)=>{ 
  const d = await Patient.findByPk(req.params.id); 
  if(!d) return res.status(404).json({message:'Not found'}); 
  await d.destroy(); 
  res.json({message:'deleted'}); 
};
