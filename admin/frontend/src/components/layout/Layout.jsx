import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Header } from './Header'

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/faculties', label: 'Faculties', icon: '🏫' },
  { path: '/departments', label: 'Departments', icon: '🏢' },
  { path: '/levels', label: 'Levels', icon: '👥' },
  { path: '/semesters', label: 'Semesters', icon: '📅' },
  { path: '/courses', label: 'Courses', icon: '📖' },
  { path: '/past-questions', label: 'Past Questions', icon: '📚' },
  { path: '/users', label: 'Administrators', icon: '👤' },
]

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
      >
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold gradient-text">ArchiveX Admin</h1>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-200
                ${location.pathname === item.path
                  ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }
              `}
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen transition-all duration-300">
        <Header />
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}