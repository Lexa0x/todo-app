import TaskItem from './TaskItem'

export default function TaskList({ tasks, onDelete }) {
  if (tasks.length === 0) {
    return <p className="text-gray-500">No hay tareas creadas</p>
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  )
}