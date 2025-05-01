const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');

// Ruta de registro
router.post(
  '/register',
  [
    check('email').isEmail().withMessage('Invalid email'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  authController.register
);

// Ruta de login
router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').exists().withMessage('Password is required'),
  ],
  authController.login
);

router.get('/verify', auth, authController.verifyToken);

router.get('/test', (req, res) => {
  res.json({ message: "Ruta de prueba funciona" });
});

module.exports = router;