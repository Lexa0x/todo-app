import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

export const getTasks = () => axios.get(`${API_URL}/api/tasks`, getAuthHeader())
export const createTask = (task) => axios.post(`${API_URL}/api/tasks`, task, getAuthHeader())
export const updateTask = (id, task) => axios.put(`${API_URL}/api/tasks/${id}`, task, getAuthHeader())
export const deleteTask = (id) => axios.delete(`${API_URL}/api/tasks/${id}`, getAuthHeader())