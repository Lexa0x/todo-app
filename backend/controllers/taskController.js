const Task = require('../models/Task');

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ 
      title, 
      description, 
      user: req.user.id 
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Obtener una tarea específica por ID
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id // Asegura que la tarea pertenezca al usuario
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Actualizar una tarea
exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id // Solo permite actualizar tareas del usuario
      },
      { 
        title, 
        description, 
        completed,
        updatedAt: Date.now() 
      },
      { 
        new: true, // Devuelve el documento actualizado
        runValidators: true // Ejecuta las validaciones del schema
      }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id // Solo permite eliminar tareas del usuario
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ 
      message: 'Task deleted successfully',
      deletedTask: task 
    });
  } catch (error) {
    next(error);
  }
};