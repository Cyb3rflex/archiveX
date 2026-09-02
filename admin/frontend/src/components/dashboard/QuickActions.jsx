import { Link } from 'react-router-dom'
import { Building2, BookOpen, FileText, Users, Calendar } from 'lucide-react'

const actions = [
  { label: 'Add Faculty', icon: Building2, href: '/faculties' },
  { label: 'Add Department', icon: BookOpen, href: '/departments' },
  { label: 'Add Course', icon: BookOpen, href: '/courses' },
  { label: 'Upload PDF', icon: FileText, href: '/past-questions' },
  { label: 'Manage Levels', icon: Users, href: '/levels' },
  { label: 'Manage Semesters', icon: Calendar, href: '/semesters' },
]

export const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Link
            key={action.label}
            to={action.href}
            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors group animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <action.icon size={20} className="text-blue-600" />
            </div>
            <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}