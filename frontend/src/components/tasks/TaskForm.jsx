import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function TaskForm({ onSubmit, editTask, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Efecto para cargar datos de tarea a editar
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast('El título es requerido', {
        icon: '✏️',
        style: {
          background: '#FEF3C7',
          color: '#92400E',
        },
        position: 'top-center',
      });
      return;
    }
    
    const taskData = { title, description };
    if (editTask) taskData.id = editTask._id;
    
    onSubmit(taskData);
    
    if (!editTask) {
      setTitle('');
      setDescription('');
    }
  };

  // Animaciones
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <motion.input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          whileFocus={{ 
            scale: 1.01,
            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción (opcional)</label>
        <motion.textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          whileFocus={{ 
            scale: 1.01,
            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
          }}
        />
      </div>

      <div className="flex space-x-3">
        {editTask && (
          <motion.button
            type="button"
            onClick={onCancelEdit}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancelar
          </motion.button>
        )}
        
        <motion.button
          type="submit"
          className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            editTask ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {editTask ? 'Actualizar Tarea' : 'Crear Tarea'}
        </motion.button>
      </div>
    </motion.form>
  );
}