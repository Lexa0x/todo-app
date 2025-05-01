module.exports = (err, req, res, next) => {
    console.error(err.stack);
    
    // Errores de validación
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: Object.values(err.errors).map(e => e.message) 
      });
    }
  
    // Errores de JWT
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    // Error por defecto
    res.status(500).json({ message: 'Internal server error' });
  };