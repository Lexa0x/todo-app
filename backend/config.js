module.exports = {
    PORT: process.env.PORT || 4000,
    MONGODB_URI: process.env.MONGODB_URI, // Obligatorio para Atlas (sin fallback a localhost)
    JWT_SECRET: process.env.JWT_SECRET || 'secret_key_placeholder', // Clave para desarrollo
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d'
  };