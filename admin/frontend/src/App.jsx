import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Layout } from './components/layout/Layout'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { Login } from './pages/auth/Login'
import { Dashboard } from './pages/Dashboard'
import { Faculties } from './pages/Faculties'
import { Departments } from './pages/Departments'
import { Levels } from './pages/Levels'
import { Semesters } from './pages/Semesters'
import { Courses } from './pages/Courses'
import { PastQuestions } from './pages/PastQuestions'
import { Users } from './pages/Users'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes - all use the Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/faculties" element={<Faculties />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/levels" element={<Levels />} />
              <Route path="/semesters" element={<Semesters />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/past-questions" element={<PastQuestions />} />
              <Route path="/users" element={<Users />} />
            </Route>
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}