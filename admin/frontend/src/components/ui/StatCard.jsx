import { ArrowUpRight } from 'lucide-react'

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    value: 'text-blue-700'
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    value: 'text-green-700'
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    value: 'text-purple-700'
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'text-orange-600',
    value: 'text-orange-700'
  }
}

export const StatCard = ({ title, value, icon: Icon, color, trend, delay = '' }) => {
  const classes = colorClasses[color] || colorClasses.blue

  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in ${delay}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${classes.value}`}>{value}</p>
          {trend && (
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <ArrowUpRight size={12} className="text-green-500" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${classes.bg}`}>
          <Icon size={24} className={classes.icon} />
        </div>
      </div>
    </div>
  )
}