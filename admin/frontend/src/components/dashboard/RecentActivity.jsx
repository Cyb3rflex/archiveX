import { Link } from 'react-router-dom'
import { Calendar, FileText, Clock } from 'lucide-react'

export const RecentActivity = ({ uploads }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Uploads</h2>
        <Link to="/past-questions" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all
        </Link>
      </div>

      <div className="space-y-4">
        {uploads.map((upload, index) => (
          <div
            key={upload.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {upload.title}
              </p>
              <p className="text-xs text-gray-500">
                {upload.course} · {upload.faculty}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar size={12} />
                {upload.date}
              </p>
              <p className="text-xs text-gray-400">{upload.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}