import { useState } from 'react'
import { Plus, Trash2, Edit3, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { SearchBar } from '../components/ui/SearchBar'

const mockFaculties = [
  { id: '1', name: 'Faculty of Engineering' },
  { id: '2', name: 'Faculty of Science' }
]

const mockDepartments = [
  { id: '1', name: 'Computer Science', facultyId: '1' },
  { id: '2', name: 'Electrical Engineering', facultyId: '1' },
  { id: '3', name: 'Mathematics', facultyId: '2' }
]

const mockLevels = [
  { id: '1', name: '100 Level' },
  { id: '2', name: '200 Level' }
]

const mockSemesters = [
  { id: '1', name: 'First Semester' },
  { id: '2', name: 'Second Semester' }
]

const mockCourses = [
  { id: '1', courseCode: 'CSC214', courseTitle: 'Operating Systems', faculty: 'Engineering', department: 'Computer Science', level: '300 Level', semester: 'Second Semester' },
  { id: '2', courseCode: 'MAT111', courseTitle: 'Calculus', faculty: 'Science', department: 'Mathematics', level: '100 Level', semester: 'First Semester' },
  { id: '3', courseCode: 'PHY101', courseTitle: 'Physics', faculty: 'Science', department: 'Physics', level: '100 Level', semester: 'First Semester' },
]

const initialFormData = {
  courseCode: '',
  courseTitle: '',
  facultyId: '',
  departmentId: '',
  levelId: '',
  semesterId: ''
}

export const Courses = () => {
  const [courses, setCourses] = useState(mockCourses)
  const [faculties, setFaculties] = useState(mockFaculties)
  const [departments, setDepartments] = useState(mockDepartments)
  const [levels, setLevels] = useState(mockLevels)
  const [semesters, setSemesters] = useState(mockSemesters)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState(initialFormData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const filteredCourses = courses.filter(c =>
    c.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const selectedFaculty = faculties.find(f => f.id === formData.facultyId)
      const selectedDepartment = departments.find(d => d.id === formData.departmentId)
      const selectedLevel = levels.find(l => l.id === formData.levelId)
      const selectedSemester = semesters.find(s => s.id === formData.semesterId)

      if (editId) {
        setCourses(prev => prev.map(c =>
          c.id === editId
            ? {
                ...c,
                ...formData,
                faculty: selectedFaculty?.name || c.faculty,
                department: selectedDepartment?.name || c.department,
                level: selectedLevel?.name || c.level,
                semester: selectedSemester?.name || c.semester
              }
            : c
        ))
        setSuccessMessage('Course updated successfully!')
      } else {
        const newCourse = {
          id: Date.now().toString(),
          ...formData,
          faculty: selectedFaculty?.name || '',
          department: selectedDepartment?.name || '',
          level: selectedLevel?.name || '',
          semester: selectedSemester?.name || ''
        }
        setCourses(prev => [...prev, newCourse])
        setSuccessMessage('Course created successfully!')
      }

      setFormData(initialFormData)
      setIsModalOpen(false)
    } catch (err) {
      setErrorMessage('Failed to save course. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setCourses(prev => prev.filter(c => c.id !== id))
      setSuccessMessage('Course deleted successfully!')
    } catch (err) {
      setErrorMessage('Failed to delete course. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
        <div className="flex items-center gap-3">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search courses..." />
          <Button variant="primary" onClick={() => { setFormData(initialFormData); setEditId(null); setIsModalOpen(true); }}>
            <Plus size={20} /> Add Course
          </Button>
        </div>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle size={20} className="text-green-600" />
          <span className="text-sm text-green-700">{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <XCircle size={20} className="text-red-600" />
          <span className="text-sm text-red-700">{errorMessage}</span>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editId ? 'Edit Course' : 'Add Course'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Course Code"
              name="courseCode"
              value={formData.courseCode}
              onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
              placeholder="e.g., CSC214"
              required
            />
            <Input
              label="Course Title"
              name="courseTitle"
              value={formData.courseTitle}
              onChange={(e) => setFormData({ ...formData, courseTitle: e.target.value })}
              placeholder="e.g., Operating Systems"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
              <select
                value={formData.facultyId}
                onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Faculty</option>
                {faculties.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Department</option>
                {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select
                value={formData.levelId}
                onChange={(e) => setFormData({ ...formData, levelId: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Level</option>
                {levels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
              <select
                value={formData.semesterId}
                onChange={(e) => setFormData({ ...formData, semesterId: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Semester</option>
                {semesters.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => { setFormData(initialFormData); setEditId(null); setIsModalOpen(false); }}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Saving...' : (editId ? 'Update Course' : 'Create Course')}
            </Button>
          </div>
        </form>
      </Modal>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredCourses.length === 0 ? (
                <tr>
                  <td className="px-6 py-8 text-center text-gray-500" colSpan="6">
                    No courses found. Add your first course above.
                  </td>
                </tr>
              ) : (
                filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.courseCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{course.courseTitle}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{course.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{course.level}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{course.semester}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        const fId = faculties.find(f => f.name === course.faculty)?.id || ''
                        const dId = departments.find(d => d.name === course.department)?.id || ''
                        const lId = levels.find(l => l.name === course.level)?.id || ''
                        const sId = semesters.find(s => s.name === course.semester)?.id || ''
                        setFormData({ ...course, facultyId: fId, departmentId: dId, levelId: lId, semesterId: sId })
                        setEditId(course.id)
                        setIsModalOpen(true)
                      }}>
                        <Edit3 size={16} /> Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(course.id)}>
                        <Trash2 size={16} /> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}