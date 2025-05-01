const bcrypt = require('bcrypt');
require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const { PORT, MONGODB_URI } = require('./config');

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB Atlas');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('Database connection error:', err);
  process.exit(1); // Detiene la app si hay error
});