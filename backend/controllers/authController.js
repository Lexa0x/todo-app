const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create user
    const user = await User.create({ email, password });
    
    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
    res.status(201).json({ token, userId: user._id });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    next(error);
  }
};

exports.verifyToken = async (req, res) => {
  try {
    console.log('User ID recibido:', req.user.id); // Debug
    
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      console.log('Usuario no encontrado para ID:', req.user.id); // Debug
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    console.log('Usuario encontrado:', user.email); // Debug
    res.status(200).json({ user });
    
  } catch (error) {
    console.error('Error en verifyToken:', error); // Debug
    res.status(500).json({ message: 'Error al verificar token' });
  }
};