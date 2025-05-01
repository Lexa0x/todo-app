import { useAuth } from '../../context/AuthContext'

export default function TaskItem({ task, onDelete }) {
  const { user } = useAuth()

  return (
    <div className="group p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex justify-between items-start">
      <div className="flex-1">
        <h3 className="font-medium text-gray-800">{task.title}</h3>
        {task.description && (
          <p className="text-gray-600 text-sm mt-2 whitespace-pre-line">{task.description}</p>
        )}
        <div className="mt-2 flex items-center text-xs text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {new Date(task.createdAt).toLocaleDateString()}
        </div>
      </div>
      {user && (
        <button 
          onClick={() => onDelete(task._id)}
          className="ml-4 p-1 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Eliminar tarea"
          title="Eliminar tarea"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}