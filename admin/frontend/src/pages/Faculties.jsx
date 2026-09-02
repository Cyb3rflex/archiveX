import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2, Edit3, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { SearchBar } from '../components/ui/SearchBar'

const initialFormData = {
  name: '',
  slug: ''
}

const mockFaculties = [
  { id: '1', name: 'Faculty of Engineering', slug: 'engineering', departments: 8 },
  { id: '2', name: 'Faculty of Science', slug: 'science', departments: 6 },
  { id: '3', name: 'Faculty of Arts', slug: 'arts', departments: 5 },
  { id: '4', name: 'Faculty of Social Sciences', slug: 'social-sciences', departments: 4 },
  { id: '5', name: 'Faculty of Management Sciences', slug: 'management-sciences', departments: 3 },
]

export const Faculties = () => {
  const [faculties, setFaculties] = useState(mockFaculties)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState(initialFormData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const filteredFaculties = faculties.filter(faculty =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (editId) {
        // Update
        setFaculties(faculties.map(f =>
          f.id === editId ? { ...f, ...formData } : f
        ))
        setSuccessMessage('Faculty updated successfully!')
      } else {
        // Create
        const newFaculty = {
          id: Date.now().toString(),
          ...formData,
          departments: Math.floor(Math.random() * 5) + 1
        }
        setFaculties([...faculties, newFaculty])
        setSuccessMessage('Faculty created successfully!')
      }

      setFormData(initialFormData)
      setIsModalOpen(false)
    } catch (err) {
      setErrorMessage('Failed to save faculty. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this faculty? This will also delete all associated departments and courses.')) return

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setFaculties(faculties.filter(f => f.id !== id))
      setSuccessMessage('Faculty deleted successfully!')
    } catch (err) {
      setErrorMessage('Failed to delete faculty. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Faculties</h1>
        <div className="flex items-center gap-3">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search faculties..."
          />
          <Button variant="primary" onClick={() => {
            setFormData(initialFormData)
            setEditId(null)
            setIsModalOpen(true)
          }}>
            <Plus size={20} /> Add Faculty
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editId ? 'Edit Faculty' : 'Add Faculty'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Faculty Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Slug (URL-friendly)"
            name="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            placeholder="e.g., engineering"
          />
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => {
              setFormData(initialFormData)
              setEditId(null)
              setIsModalOpen(false)
            }}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Saving...' : (editId ? 'Update Faculty' : 'Create Faculty')}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredFaculties.length === 0 ? (
                <tr>
                  <td className="px-6 py-8 text-center text-gray-500" colSpan="4">
                    No faculties found. Add your first faculty above.
                  </td>
                </tr>
              ) : (
                filteredFaculties.map((faculty, index) => (
                  <tr key={faculty.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{faculty.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{faculty.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{faculty.departments}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFormData({
                            name: faculty.name,
                            slug: faculty.slug
                          })
                          setEditId(faculty.id)
                          setIsModalOpen(true)
                        }}
                      >
                        <Edit3 size={16} /> Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(faculty.id)}
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