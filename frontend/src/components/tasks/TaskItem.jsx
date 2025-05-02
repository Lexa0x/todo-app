import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

export default function TaskItem({ task, onDelete }) {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      className="group p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex justify-between items-start"
    >
      <div className="flex-1">
        <motion.h3 
          className="font-medium text-gray-800"
          whileHover={{ color: '#1e40af' }}
          transition={{ duration: 0.2 }}
        >
          {task.title}
        </motion.h3>
        
        {task.description && (
          <motion.p 
            className="text-gray-600 text-sm mt-2 whitespace-pre-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {task.description}
          </motion.p>
        )}
        
        <motion.div 
          className="mt-2 flex items-center text-xs text-gray-500"
          whileHover={{ scale: 1.05 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {new Date(task.createdAt).toLocaleDateString()}
        </motion.div>
      </div>
      
      {user && (
        <motion.button 
          onClick={() => onDelete(task._id)}
          className="ml-4 p-1 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Eliminar tarea"
          title="Eliminar tarea"
          whileHover={{ 
            scale: 1.2,
            color: '#ef4444'
          }}
          whileTap={{ 
            scale: 0.8,
            color: '#dc2626'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </motion.button>
      )}
    </motion.div>
  );
}