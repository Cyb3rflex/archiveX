import { useState } from 'react'
import { Plus, Trash2, Edit3, CheckCircle, XCircle, FileText, Upload } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { SearchBar } from '../components/ui/SearchBar'

const mockDepartments = [
  { id: '1', name: 'Computer Science' },
  { id: '2', name: 'Mathematics' }
]

const mockCourses = [
  { id: '1', courseCode: 'CSC214', courseTitle: 'Operating Systems' },
  { id: '2', courseCode: 'MAT111', courseTitle: 'Calculus' }
]

const mockLevels = [
  { id: '1', name: '100 Level' },
  { id: '2', name: '200 Level' }
]

const mockSemesters = [
  { id: '1', name: 'First Semester' },
  { id: '2', name: 'Second Semester' }
]

const examTypes = ['CA', 'MID_SEMESTER', 'FINAL']

const mockPastQuestions = [
  { id: '1', courseCode: 'CSC214', courseTitle: 'Operating Systems', session: '2024/2025', year: 2024, examType: 'FINAL', fileName: 'CSC214-final-2024.pdf', fileSize: '2.4 MB', downloads: 12 },
  { id: '2', courseCode: 'MAT111', courseTitle: 'Calculus', session: '2024/2025', year: 2024, examType: 'CA', fileName: 'MAT111-ca-2024.pdf', fileSize: '1.8 MB', downloads: 8 },
  { id: '3', courseCode: 'CSC214', courseTitle: 'Operating Systems', session: '2023/2024', year: 2023, examType: 'FINAL', fileName: 'CSC214-final-2023.pdf', fileSize: '2.7 MB', downloads: 20 },
]

const initialFormData = {
  courseId: '',
  session: '',
  year: '',
  examType: 'FINAL',
  file: null
}

export const PastQuestions = () => {
  const [pastQuestions, setPastQuestions] = useState(mockPastQuestions)
  const [courses] = useState(mockCourses)
  const [departments] = useState(mockDepartments)
  const [levels] = useState(mockLevels)
  const [semesters] = useState(mockSemesters)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState(initialFormData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const filteredQuestions = pastQuestions.filter(q =>
    q.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.session.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCourseName = (courseId) => {
    const course = courses.find(c => c.id === courseId)
    return course ? `${course.courseCode} - ${course.courseTitle}` : ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      if (editId) {
        setPastQuestions(prev => prev.map(q =>
          q.id === editId
            ? { ...q, ...formData, courseCode: getCourseName(formData.courseId).split(' - ')[0], courseTitle: getCourseName(formData.courseId).split(' - ')[1] || '' }
            : q
        ))
        setSuccessMessage('Past question updated successfully!')
      } else {
        const selectedCourse = courses.find(c => c.id === formData.courseId)
        const newQuestion = {
          id: Date.now().toString(),
          courseCode: selectedCourse?.courseCode || '',
          courseTitle: selectedCourse?.courseTitle || '',
          ...formData,
          fileName: formData.file?.name || 'file.pdf',
          fileSize: formData.file ? `${(formData.file.size / 1024 / 1024).toFixed(1)} MB` : '0 MB',
          downloads: 0
        }
        setPastQuestions(prev => [...prev, newQuestion])
        setSuccessMessage('Past question uploaded successfully!')
      }

      setFormData(initialFormData)
      setIsModalOpen(false)
    } catch (err) {
      setErrorMessage('Failed to save past question. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this past question?')) return

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setPastQuestions(prev => prev.filter(q => q.id !== id))
      setSuccessMessage('Past question deleted successfully!')
    } catch (err) {
      setErrorMessage('Failed to delete past question. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Past Questions</h1>
        <div className="flex items-center gap-3">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search past questions..." />
          <Button variant="primary" onClick={() => { setFormData(initialFormData); setEditId(null); setIsModalOpen(true); }}>
            <Upload size={20} /> Upload PDF
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editId ? 'Edit Past Question' : 'Upload Past Question'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Course"
              value={formData.courseId}
              onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
              required
            >
              <option value="">Select Course</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.courseCode} - {c.courseTitle}</option>)}
            </Select>
            <Input
              label="Session"
              name="session"
              value={formData.session}
              onChange={(e) => setFormData({ ...formData, session: e.target.value })}
              placeholder="e.g., 2024/2025"
              required
            />
            <Input
              label="Year"
              name="year"
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="e.g., 2024"
              required
            />
            <Select
              label="Exam Type"
              value={formData.examType}
              onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
              required
            >
              <option value="CA">CA</option>
              <option value="MID_SEMESTER">Mid Semester</option>
              <option value="FINAL">Final</option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.file && (
                <FileText size={20} className="text-green-600" />
              )}
            </div>
            <p className="mt-1 text-xs text-gray-500">Only PDF files are accepted.</p>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => { setFormData(initialFormData); setEditId(null); setIsModalOpen(false); }}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Uploading...' : (editId ? 'Update Question' : 'Upload Question')}
            </Button>
          </div>
        </form>
      </Modal>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredQuestions.length === 0 ? (
                <tr>
                  <td className="px-6 py-8 text-center text-gray-500" colSpan="6">
                    No past questions found. Upload your first PDF above.
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((question) => (
                  <tr key={question.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div>
                        <p>{question.courseCode}</p>
                        <p className="text-xs text-gray-500">{question.courseTitle}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{question.session}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${question.examType === 'FINAL' ? 'bg-purple-100 text-purple-800' :
                          question.examType === 'CA' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'}`}
                      >
                        {question.examType === 'FINAL' ? 'Final' : question.examType === 'CA' ? 'CA' : 'Mid Semester'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <FileText size={16} className="text-gray-400" />
                        <span className="truncate max-w-[120px]">{question.fileName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{question.downloads}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        const c = courses.find(c => c.courseCode === question.courseCode)
                        if (c) {
                          setFormData({ courseId: c.id, session: question.session, year: question.year, examType: question.examType, file: null })
                          setEditId(question.id)
                          setIsModalOpen(true)
                        }
                      }}>
                        <Edit3 size={16} /> Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(question.id)}>
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