import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/auth';

const AuthContext = createContext();

// Exporta el contexto directamente para evitar problemas con Fast Refresh
export const AuthContextInstance = AuthContext;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // Verificar token al cargar
      const verifyToken = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            throw new Error('Token inválido');
          }
        } catch (error) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      };
      verifyToken();
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);
  

  const authActions = useMemo(() => ({
    login: async (email, password) => {
      try {
        const { token, user } = await apiLogin(email, password);
        localStorage.setItem('token', token);
        setToken(token);
        setUser(user);
        return true;
      } catch (error) {
        throw error;
      }
    },
    register: async (email, password) => {
      const { token, user } = await apiRegister(email, password);
      setToken(token);
      setUser(user);
    },
    logout: () => {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  }), []);

  const value = useMemo(() => ({
    user,
    token,
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