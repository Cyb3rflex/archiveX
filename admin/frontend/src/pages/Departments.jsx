import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit3, CheckCircle, XCircle, ChevronDown } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { SearchBar } from '../components/ui/SearchBar'

const mockFaculties = [
  { id: '1', name: 'Faculty of Engineering' },
  { id: '2', name: 'Faculty of Science' },
  { id: '3', name: 'Faculty of Arts' }
]

const mockDepartments = [
  { id: '1', name: 'Computer Science', facultyId: '1', faculty: 'Engineering' },
  { id: '2', name: 'Electrical Engineering', facultyId: '1', faculty: 'Engineering' },
  { id: '3', name: 'Mechanical Engineering', facultyId: '1', faculty: 'Engineering' },
  { id: '4', name: 'Mathematics', facultyId: '2', faculty: 'Science' },
  { id: '5', name: 'Physics', facultyId: '2', faculty: 'Science' },
  { id: '6', name: 'Chemistry', facultyId: '2', faculty: 'Science' },
  { id: '7', name: 'English', facultyId: '3', faculty: 'Arts' },
  { id: '8', name: 'History', facultyId: '3', faculty: 'Arts' },
]

const initialFormData = {
  name: '',
  facultyId: ''
}

export const Departments = () => {
  const [departments, setDepartments] = useState(mockDepartments)
  const [faculties, setFaculties] = useState(mockFaculties)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState(initialFormData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const filteredDepartments = departments.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const selectedFaculty = faculties.find(f => f.id === formData.facultyId)

      if (editId) {
        setDepartments(prev => prev.map(d =>
          d.id === editId
            ? {
                ...d,
                ...formData,
                faculty: selectedFaculty?.name || d.faculty
              }
            : d
        ))
        setSuccessMessage('Department updated successfully!')
      } else {
        const newDept = {
          id: Date.now().toString(),
          ...formData,
          faculty: selectedFaculty?.name || ''
        }
        setDepartments(prev => [...prev, newDept])
        setSuccessMessage('Department created successfully!')
      }

      setFormData(initialFormData)
      setIsModalOpen(false)
    } catch (err) {
      setErrorMessage('Failed to save department. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setDepartments(prev => prev.filter(d => d.id !== id))
      setSuccessMessage('Department deleted successfully!')
    } catch (err) {
      setErrorMessage('Failed to delete department. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Departments</h1>
        <div className="flex items-center gap-3">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search departments..."
          />
          <Button variant="primary" onClick={() => {
            setFormData(initialFormData)
            setEditId(null)
            setIsModalOpen(true)
          }}>
            <Plus size={20} /> Add Department
          </Button>
        </div>
      </div>

      {/* Messages */}
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

      {/* Form Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editId ? 'Edit Department' : 'Add Department'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Department Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Faculty
            </label>
            <select
              value={formData.facultyId}
              onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a faculty</option>
              {faculties.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => {
              setFormData(initialFormData)
              setEditId(null)
              setIsModalOpen(false)
            }}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Saving...' : (editId ? 'Update Department' : 'Create Department')}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredDepartments.length === 0 ? (
                <tr>
                  <td className="px-6 py-8 text-center text-gray-500" colSpan="3">
                    No departments found. Add your first department above.
                  </td>
                </tr>
              ) : (
                filteredDepartments.map((dept, index) => (
                  <tr key={dept.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{dept.faculty}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFormData({
                            name: dept.name,
                            facultyId: faculties.find(f => f.name === dept.faculty)?.id || ''
                          })
                          setEditId(dept.id)
                          setIsModalOpen(true)
                        }}
                      >
                        <Edit3 size={16} /> Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(dept.id)}
                      >
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