const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // User model
const { Doctor } = require("../models"); // Doctor model if using named exports

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });

    // Fetch user with associated doctor info if exists
    const user = await User.findOne({
      where: { email },
      include: [{ model: Doctor, as: "doctor" }] // safe even if user is not a doctor
    });

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(400).json({ message: "Invalid credentials" });

    // Prepare doctor info if user is a doctor
    let profileInfo = {};
    if (user.role === "doctor" && user.doctor) {
      profileInfo = {
        firstName: user.firstName,
        lastName: user.lastName,
        specialty: user.doctor.specialty || "",
        phone: user.phone || "",
      };
    } else {
      // fallback for non-doctors
      profileInfo = {
        firstName: user.firstName,
        lastName: user.lastName
      };
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        ...profileInfo
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Vérifier si email existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user"
    });

    res.status(201).json({ message: "User created", user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

