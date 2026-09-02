import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, Users, BookOpen, FileText, ArrowRight, TrendingUp } from 'lucide-react'
import { StatCard } from '../components/ui/StatCard'
import { RecentActivity } from '../components/dashboard/RecentActivity'
import { QuickActions } from '../components/dashboard/QuickActions'

// Mock data - replace with actual API calls
const mockStats = {
  faculties: 12,
  departments: 48,
  courses: 356,
  pastQuestions: 2401
}

const mockRecentUploads = [
  { id: '1', title: 'CSC214 - Operating Systems', course: 'CSC214', faculty: 'Engineering', department: 'Computer Science', date: '2026-09-01', size: '2.4 MB', downloads: 12 },
  { id: '2', title: 'MAT111 - Calculus', course: 'MAT111', faculty: 'Science', department: 'Mathematics', date: '2026-08-30', size: '1.8 MB', downloads: 8 },
  { id: '3', title: 'PHY101 - Physics', course: 'PHY101', faculty: 'Science', department: 'Physics', date: '2026-08-28', size: '3.1 MB', downloads: 15 },
  { id: '4', title: 'ENG202 - Literature', course: 'ENG202', faculty: 'Arts', department: 'English', date: '2026-08-25', size: '1.2 MB', downloads: 5 },
  { id: '5', title: 'CSC326 - Database Systems', course: 'CSC326', faculty: 'Engineering', department: 'Computer Science', date: '2026-08-22', size: '2.7 MB', downloads: 20 },
]

export const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      try {
        // In production: const res = await fetch('/api/v1/dashboard')
        await new Promise(resolve => setTimeout(resolve, 500))
        setStats(mockStats)
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">Overview of your academic resource management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Faculties"
          value={stats.faculties}
          icon={Users}
          color="blue"
          trend="+2 this month"
          delay="delay-100"
        />
        <StatCard
          title="Departments"
          value={stats.departments}
          icon={BookOpen}
          color="green"
          trend="+5 this month"
          delay="delay-200"
        />
        <StatCard
          title="Courses"
          value={stats.courses}
          icon={BookOpen}
          color="purple"
          trend="+12 this month"
          delay="delay-300"
        />
        <StatCard
          title="Past Questions"
          value={stats.pastQuestions}
          icon={FileText}
          color="orange"
          trend="+156 this month"
          delay="delay-400"
        />
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity uploads={mockRecentUploads} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">ArchiveX v1.0</h2>
            <p className="mt-1 text-blue-100">Preserving Academic Knowledge, One Paper at a Time.</p>
          </div>
          <div className="hidden sm:block">
            <TrendingUp size={48} className="text-blue-200" />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold">{stats.faculties}</p>
            <p className="text-blue-200 text-sm">Faculties</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{stats.departments}</p>
            <p className="text-blue-200 text-sm">Departments</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{stats.courses}</p>
            <p className="text-blue-200 text-sm">Courses</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{stats.pastQuestions}</p>
            <p className="text-blue-200 text-sm">Past Questions</p>
          </div>
        </div>
      </div>
    </div>
  )
}