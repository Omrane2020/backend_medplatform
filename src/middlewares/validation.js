exports.validateActivityLog = (req, res, next) => {
  const { action, userId } = req.body;
  
  if (!action) {
    return res.status(400).json({ message: "L'action est requise" });
  }
  
  if (!userId) {
    return res.status(400).json({ message: "L'ID utilisateur est requis" });
  }
  
  next();
};

exports.validateUser = (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  
  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }
  
  if (!['doctor', 'patient', 'admin', 'secretary'].includes(role)) {
    return res.status(400).json({ message: "Rôle invalide" });
  }
  
  next();
};