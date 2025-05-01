import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('¡Bienvenido!', {
        icon: '👋',
        style: {
          background: '#ECFDF5',
          color: '#065F46',
        },
      });
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Credenciales incorrectas', {
        icon: '🔒',
        style: {
          background: '#FEE2E2',
          color: '#B91C1C',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </div>
  );
}