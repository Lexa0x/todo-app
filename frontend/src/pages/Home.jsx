import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getTasks, createTask, deleteTask } from '../api/tasks'
import TaskForm from '../components/tasks/TaskForm'
import TaskList from '../components/tasks/TaskList'
import { toast } from 'react-hot-toast'

export default function Home() {
  const { user, logout } = useAuth()
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks()
        setTasks(response.data)
      } catch (error) {
        toast.error('Error al cargar tareas', {
          icon: '⚠️',
          position: 'bottom-right',
          style: {
            background: '#FEE2E2',
            color: '#B91C1C',
          },
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (user) fetchTasks()
  }, [user])

  const handleCreateTask = async (taskData) => {
    try {
      const response = await createTask(taskData)
      setTasks([...tasks, response.data])
      toast.success('Tarea creada exitosamente', {
        icon: '✅',
        position: 'bottom-right',
        style: {
          background: '#ECFDF5',
          color: '#065F46',
        },
      })
    } catch (error) {
      toast.error('Error al crear tarea', {
        icon: '⚠️',
        position: 'bottom-right',
        style: {
          background: '#FEE2E2',
          color: '#B91C1C',
        },
      })
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId)
      setTasks(tasks.filter(task => task._id !== taskId))
      toast.success('Tarea eliminada', {
        icon: '🗑️',
        position: 'bottom-right',
        style: {
          background: '#ECFDF5',
          color: '#065F46',
        },
      })
    } catch (error) {
      toast.error('Error al eliminar tarea', {
        icon: '⚠️',
        position: 'bottom-right',
        style: {
          background: '#FEE2E2',
          color: '#B91C1C',
        },
      })
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-xl font-semibold mb-4">Por favor inicia sesión</h2>
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Registrarse
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Mis Tareas</h1>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Nueva Tarea</h2>
          <TaskForm onSubmit={handleCreateTask} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Tus Tareas</h2>
          {isLoading ? (
            <div className="flex justify-center">
              <p className="animate-pulse">Cargando tareas...</p>
            </div>
          ) : tasks.length === 0 ? (
            <p className="text-gray-500">No hay tareas aún. ¡Crea una!</p>
          ) : (
            <TaskList tasks={tasks} onDelete={handleDeleteTask} />
          )}
        </div>
      </div>
    </div>
  )
}