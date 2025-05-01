import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContextInstance } from './context/AuthContext';
import { useContext } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';

function AuthWrapper() {
  const { user } = useContext(AuthContextInstance);
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="register" element={!user ? <Register /> : <Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen w-screen flex flex-col">
          <AuthWrapper />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#374151',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}