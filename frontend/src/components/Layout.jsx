import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow p-4"> {/* Añadido p-4 para espaciado */}
        <Outlet />
      </main>
      <footer className="bg-white py-4 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} TodoApp
      </footer>
    </div>
  )
}