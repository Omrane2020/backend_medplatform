const { Patient, User, Doctor } = require('../models');


exports.listPatients = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      where: { userId: req.user.id }
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const patients = await Patient.findAll({
      where: { doctorId: doctor.id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["firstName", "lastName", "email", "phone"]
        }
      ]
    });

    res.json(patients);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
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
