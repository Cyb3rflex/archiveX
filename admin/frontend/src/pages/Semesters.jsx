import { useState } from 'react'
import { Plus, Trash2, Edit3, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { SearchBar } from '../components/ui/SearchBar'

const mockSemesters = [
  { id: '1', name: 'First Semester' },
  { id: '2', name: 'Second Semester' },
]

export const Semesters = () => {
  const [semesters, setSemesters] = useState(mockSemesters)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({ name: '' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const filteredSemesters = semesters.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (editId) {
        setSemesters(semesters.map(s => s.id === editId ? { ...s, ...formData } : s))
        setSuccessMessage('Semester updated successfully!')
      } else {
        setSemesters([...semesters, { id: Date.now().toString(), ...formData }])
        setSuccessMessage('Semester created successfully!')
      }

      setFormData({ name: '' })
      setIsModalOpen(false)
    } catch (err) {
      setErrorMessage('Failed to save semester. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this semester?')) return

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setSemesters(semesters.filter(s => s.id !== id))
      setSuccessMessage('Semester deleted successfully!')
    } catch (err) {
      setErrorMessage('Failed to delete semester. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Semesters</h1>
        <div className="flex items-center gap-3">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search semesters..." />
          <Button variant="primary" onClick={() => { setFormData({ name: '' }); setEditId(null); setIsModalOpen(true); }}>
            <Plus size={20} /> Add Semester
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editId ? 'Edit Semester' : 'Add Semester'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Semester Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
            placeholder="e.g., First Semester"
            required
          />
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => { setFormData({ name: '' }); setEditId(null); setIsModalOpen(false); }}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Saving...' : (editId ? 'Update Semester' : 'Create Semester')}
            </Button>
          </div>
        </form>
      </Modal>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredSemesters.length === 0 ? (
                <tr>
                  <td className="px-6 py-8 text-center text-gray-500" colSpan="2">
                    No semesters found.
                  </td>
                </tr>
              ) : (
                filteredSemesters.map((semester) => (
                  <tr key={semester.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{semester.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button variant="outline" size="sm" onClick={() => { setFormData({ name: semester.name }); setEditId(semester.id); setIsModalOpen(true); }}>
                        <Edit3 size={16} /> Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(semester.id)}>
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