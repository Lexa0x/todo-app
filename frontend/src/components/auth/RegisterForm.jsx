import { useState } from 'react'

export default function RegisterForm({ onSubmit, isLoading }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }
    onSubmit(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          required
          minLength="6"
        />
        <p className="mt-1 text-xs text-gray-500">Mínimo 6 caracteres</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          required
          minLength="6"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-gray-700 font-medium rounded-lg shadow-md transition-all ${
          isLoading ? 'opacity-80 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Registrando...' : 'Crear Cuenta'}
      </button>
    </form>
  );
}