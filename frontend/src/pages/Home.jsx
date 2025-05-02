import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks'
import TaskForm from '../components/tasks/TaskForm'
import TaskList from '../components/tasks/TaskList'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function Home() {
  const { user, logout } = useAuth()
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks()
        setTasks(response.data)
      } catch (error) {
        showErrorToast('Error al cargar tareas')
      } finally {
        setIsLoading(false)
      }
    }

    if (user) fetchTasks()
  }, [user])

  const showErrorToast = (message) => {
    toast.error(message, {
      icon: '⚠️',
      position: 'bottom-right',
      style: {
        background: '#FEE2E2',
        color: '#B91C1C',
      },
    })
  }

  const showSuccessToast = (message, icon = '✅') => {
    toast.success(message, {
      icon,
      position: 'bottom-right',
      style: {
        background: '#ECFDF5',
        color: '#065F46',
      },
    })
  }

  const handleSubmitTask = async (taskData) => {
    try {
      if (editingTask) {
        // Modo edición
        const response = await updateTask(editingTask._id, taskData)
        setTasks(tasks.map(task => 
          task._id === editingTask._id ? response.data : task
        ))
        showSuccessToast('Tarea actualizada exitosamente')
      } else {
        // Modo creación
        const response = await createTask(taskData)
        setTasks([response.data, ...tasks])
        showSuccessToast('Tarea creada exitosamente')
      }
      setEditingTask(null)
    } catch (error) {
      showErrorToast(editingTask ? 'Error al actualizar tarea' : 'Error al crear tarea')
    }
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    // Desplazamiento suave al formulario
    document.getElementById('task-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId)
      setTasks(tasks.filter(task => task._id !== taskId))
      // Si estamos editando la tarea eliminada, cancelamos la edición
      if (editingTask && editingTask._id === taskId) {
        setEditingTask(null)
      }
      showSuccessToast('Tarea eliminada', '🗑️')
    } catch (error) {
      showErrorToast('Error al eliminar tarea')
    }
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto p-4 text-center"
      >
        <h2 className="text-xl font-semibold mb-4">Por favor inicia sesión</h2>
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-200 text-white rounded hover:bg-blue-300 transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Registrarse
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-4"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Tareas</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div 
          id="task-form"
          layout
          className="bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingTask ? 'Editar Tarea' : 'Nueva Tarea'}
          </h2>
          <TaskForm 
            onSubmit={handleSubmitTask}
            editTask={editingTask}
            onCancelEdit={handleCancelEdit}
          />
        </motion.div>
        
        <motion.div 
          layout
          className="bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">Tus Tareas</h2>
          {isLoading ? (
            <div className="flex justify-center">
              <p className="animate-pulse">Cargando tareas...</p>
            </div>
          ) : tasks.length === 0 ? (
            <p className="text-gray-500">No hay tareas aún. ¡Crea una!</p>
          ) : (
            <TaskList 
              tasks={tasks} 
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}