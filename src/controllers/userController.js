// controllers/userController.js
const { User, Doctor, Patient } = require("../models"); // Assure-toi que tu importes depuis le dossier 'models/index.js'
const bcrypt = require("bcrypt");

// Liste tous les utilisateurs
exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email", "role", "isActive", "createdAt"]
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Récupère un utilisateur par son ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "firstName", "lastName", "email", "role", "isActive"]
    });
    if (!user) return res.status(404).json({ message: "Not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Met à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Not found" });

    await user.update(req.body);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Supprime un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Not found" });

    await user.destroy();
    res.json({ message: "deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



/* exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, specialty, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone: phone || null,
      specialty: specialty || null,
      role: role || 'patient'
    });

    // Remove password from response
    const userResponse = { ...user.toJSON() };
    delete userResponse.password;

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors.map(e => e.message) 
      });
    }
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        message: 'Email already exists' 
      });
    }

    res.status(500).json({ message: 'Server error during registration' });
  }
};
*/



exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, specialty, role } = req.body;

    // Validation de base
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ 
        message: 'Les champs obligatoires sont manquants' 
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Un utilisateur existe déjà avec cet email' 
      });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur dans la table User
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone: phone || null,
      role: role || 'patient'
    });

    // Ajouter dans la table spécifique selon le rôle
    if (role === 'doctor') {
      await Doctor.create({
        userId: user.id,
        specialty: specialty || null
        // Le phone est déjà dans User, pas besoin de le dupliquer
      });
    } else if (role === 'patient') {
      await Patient.create({
        userId: user.id
        // Les autres champs peuvent être remplis plus tard
      });
    }

    // Préparer la réponse sans le mot de passe
    const userResponse = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.status(201).json({
      message: 'Utilisateur inscrit avec succès',
      user: userResponse
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Erreur de validation',
        errors: error.errors.map(e => e.message)
      });
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: 'Cet email existe déjà'
      });
    }

    res.status(500).json({ 
      message: 'Erreur serveur lors de l\'inscription' 
    });
  }
};