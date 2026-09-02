import { useState } from 'react'
import { Plus, Trash2, Edit3, CheckCircle, XCircle, Shield, ShieldCheck } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { SearchBar } from '../components/ui/SearchBar'
import { Badge } from '../components/ui/Badge'

const mockUsers = [
  { id: '1', fullName: 'Super Admin', email: 'super@archivex.com', role: 'SUPER_ADMIN', createdAt: '2026-01-01' },
  { id: '2', fullName: 'John Doe', email: 'john@archivex.com', role: 'ADMIN', createdAt: '2026-06-15' },
  { id: '3', fullName: 'Jane Smith', email: 'jane@archivex.com', role: 'ADMIN', createdAt: '2026-07-20' },
]

const initialFormData = {
  fullName: '',
  email: '',
  password: '',
  role: 'ADMIN'
}

export const Users = () => {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState(initialFormData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const filteredUsers = users.filter(u =>
    u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (editId) {
        setUsers(prev => prev.map(u =>
          u.id === editId ? { ...u, ...formData, password: undefined } : u
        ))
        setSuccessMessage('User updated successfully!')
      } else {
        const newUser = {
          id: Date.now().toString(),
          fullName: formData.fullName,
          email: formData.email,
          role: formData.role,
          createdAt: new Date().toISOString().split('T')[0]
        }
        setUsers(prev => [...prev, newUser])
        setSuccessMessage('User created successfully!')
      }

      setFormData(initialFormData)
      setIsModalOpen(false)
    } catch (err) {
      setErrorMessage('Failed to save user. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this administrator?')) return

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setUsers(prev => prev.filter(u => u.id !== id))
      setSuccessMessage('User deleted successfully!')
    } catch (err) {
      setErrorMessage('Failed to delete user. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Administrators</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage admin accounts</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search users..." />
          <Button variant="primary" onClick={() => { setFormData(initialFormData); setEditId(null); setIsModalOpen(true); }}>
            <Plus size={20} /> Add Admin
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editId ? 'Edit Administrator' : 'Add Administrator'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="John Doe"
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            required
          />
          {!editId && (
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Minimum 12 characters"
              required
            />
          )}
          <Select
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </Select>
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => { setFormData(initialFormData); setEditId(null); setIsModalOpen(false); }}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Saving...' : (editId ? 'Update User' : 'Create User')}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td className="px-6 py-8 text-center text-gray-500" colSpan="5">
                    No administrators found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Badge variant={user.role === 'SUPER_ADMIN' ? 'warning' : 'primary'}>
                        <span className="flex items-center gap-1">
                          {user.role === 'SUPER_ADMIN' ? <ShieldCheck size={12} /> : <Shield size={12} />}
                          {user.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
                        </span>
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.createdAt}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        setFormData({ fullName: user.fullName, email: user.email, password: '', role: user.role })
                        setEditId(user.id)
                        setIsModalOpen(true)
                      }}>
                        <Edit3 size={16} /> Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
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