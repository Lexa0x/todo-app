const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  try {
    // 1. Obtener token
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Formato de token inválido. Use: Bearer <token>' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // 2. Verificar token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 3. Asignar usuario (asegurando compatibilidad)
    req.user = { 
      id: decoded.id,    // Para login/register
      _id: decoded.id,   // Compatibilidad con Mongoose
      userId: decoded.id // Para algunos controladores
    };
    
    next();
  } catch (error) {
    console.error('Error en auth middleware:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    
    res.status(401).json({ message: 'Error de autenticación' });
  }
};