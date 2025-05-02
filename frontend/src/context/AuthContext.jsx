import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/auth';

const AuthContext = createContext();

// Exporta el contexto directamente para evitar problemas con Fast Refresh
export const AuthContextInstance = AuthContext;

export function AuthProvider({ children }) {
  // Estado inicial leyendo de localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Efecto para verificar token al montar el componente y cuando el token cambie
  useEffect(() => {
    const verifyAndPersistAuth = async () => {
      if (token) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.ok) {
            const data = await response.json();
            // Persistir ambos, token y user
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
          } else {
            throw new Error('Token inválido');
          }
        } catch (error) {
          clearAuthData();
        }
      } else {
        clearAuthData();
      }
    };

    verifyAndPersistAuth();
  }, [token]);

  // Función para limpiar todos los datos de autenticación
  const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const authActions = useMemo(() => ({
    login: async (email, password) => {
      try {
        const { token, user } = await apiLogin(email, password);
        // Persistir ambos datos
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
        return true;
      } catch (error) {
        clearAuthData();
        throw error;
      }
    },
    
    register: async (email, password) => {
      try {
        const { token, user } = await apiRegister(email, password);
        // Persistir datos de registro
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
      } catch (error) {
        clearAuthData();
        throw error;
      }
    },
    
    logout: () => {
      clearAuthData();
    }
  }), []);

  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated: !!token, // Helper para verificar autenticación
    ...authActions
  }), [user, token, authActions]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook useAuth optimizado
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}