const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/auth');
const { check } = require('express-validator');

// Todas las rutas requieren autenticación JWT
router.use(authMiddleware);

// Obtener todas las tareas del usuario
router.get('/', taskController.getAllTasks);

// Obtener una tarea específica
router.get('/:id', taskController.getTaskById);

// Crear nueva tarea
router.post(
  '/',
  [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('description').optional().isString(),
  ],
  taskController.createTask
);

// Actualizar tarea
router.put(
  '/:id',
  [
    check('title').optional().not().isEmpty(),
    check('description').optional().isString(),
    check('completed').optional().isBoolean(),
  ],
  taskController.updateTask
);

// Eliminar tarea
router.delete('/:id', taskController.deleteTask);

module.exports = router;