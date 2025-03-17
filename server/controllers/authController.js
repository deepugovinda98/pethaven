const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Register a new user
exports.register = async (req, res) => {
  const { role, fname, lname, email, pass, address, state, phone } = req.body;

  try {
    // Validate input fields
    if (!fname || !lname || !email || !pass || !address || !state || !phone || !role) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // If role is "admin", ensure that only one admin exists
    if (role === "admin") {
      const existingAdmin = await User.findOne({ role: "admin" });
      if (existingAdmin) {
        return res.status(400).json({ error: "Admin already exists!" });
      }
    }

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Create and save the new user
    const newUser = new User({
      fname,
      lname,
      email,
      pass: hashedPassword,
      address,
      state,
      phone,
      role
    });
    await newUser.save();

    res.status(201).json({ 
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!`
    });
  } catch (err) {
    console.error("Error in register:", err);
    res.status(500).json({ error: "Server error while registering user" });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, pass } = req.body;

  try {
    if (!email || !pass) {
      return res.status(400).json({ error: "Email and password are required!" });
    }

    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password!" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password!" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY || "default_secret",
      { expiresIn: "1h" }
    );

    // Send user ID in response
    res.status(200).json({ 
      message: "Login successful!", 
      token, 
      userId: user._id,  // Send userId in response
      role: user.role 
    });

  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ error: "Server error while logging in" });
  }
};
