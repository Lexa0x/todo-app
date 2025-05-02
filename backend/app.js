const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const rateLimit = require('./utils/rateLimiter');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');
import { apiLimiter, authLimiter } from './utils/rateLimiter';
import helmet from 'helmet';

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(rateLimit);
app.use(apiLimiter);
app.use(helmet());

app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
    },
  }));

app.get('/', (req, res) => {
    res.status(200).json({
      message: 'API en funcionamiento',
      endpoints: {
        tasks: '/api/tasks',
        users: '/api/users'
        // ...otros endpoints que tengas
      }
    });
  });

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/tasks', taskRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;