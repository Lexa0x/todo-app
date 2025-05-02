import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return <p className="text-gray-500">No hay tareas creadas</p>;
  }

  // Animaciones configuradas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className="space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {tasks.map(task => (
          <motion.div
            key={task._id}
            variants={itemVariants}
            exit="exit"
            layout
          >
            <TaskItem 
              task={task} 
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}