import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });
      console.log('Respuesta del login:', response.data); // Debug
      return response.data;
    } catch (error) {
      console.error('Error en login:', error.response); // Debug
      throw error;
    }
  };

export const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, { email, password })
  return response.data
}

export const verify = async (token) => {
    const response = await axios.get(`${API_URL}/api/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluye el token JWT
      },
    });
    return response.data;
  };