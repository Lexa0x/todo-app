import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import RegisterForm from '../components/auth/RegisterForm'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (email, password) => {
    setIsLoading(true)
    try {
      await register(email, password)
      toast.success('¡Cuenta creada con éxito!', {
        icon: '🎉',
        style: {
          background: '#ECFDF5',
          color: '#065F46',
        },
      })
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error en registro', {
        icon: '❌',
        style: {
          background: '#FEE2E2',
          color: '#B91C1C',
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Registrarse</h1>
        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
      </div>
    </div>
  )
}