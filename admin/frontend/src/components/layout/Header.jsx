import { LogOut, User, ChevronDown } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Welcome back, {user?.fullName || 'Admin'}
          </h2>
          <p className="text-sm text-gray-500">
            {user?.role === 'SUPER_ADMIN' ? 'Super Administrator' : 'Administrator'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User size={20} className="text-blue-600" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user?.fullName || 'Admin'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}