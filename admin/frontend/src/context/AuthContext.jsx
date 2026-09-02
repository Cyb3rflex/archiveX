import { createContext, useContext, useState, useEffect } from 'react'
import api from '../lib/api'

const AuthContext = createContext()

// Set to true ONLY for development without a real backend.
// The login form will accept any credentials.
const USE_MOCK_AUTH = false

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('archiveX_token') || null
  })
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('archiveX_user')
    return storedUser ? JSON.parse(storedUser) : null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        // Verify token is still valid by fetching the current user
        const data = await api.get('/auth/me')
        setUser(data.data)
      } catch (err) {
        // Token invalid or expired — clear it
        localStorage.removeItem('archiveX_token')
        localStorage.removeItem('archiveX_user')
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials) => {
    if (USE_MOCK_AUTH) {
      await new Promise(resolve => setTimeout(resolve, 400))
      const mockToken = 'mock-jwt-' + Date.now()
      const mockUser = {
        id: '1',
        email: credentials.email || 'demo@archivex.com',
        fullName: 'Demo Administrator',
        role: 'SUPER_ADMIN',
      }
      localStorage.setItem('archiveX_token', mockToken)
      localStorage.setItem('archiveX_user', JSON.stringify(mockUser))
      setToken(mockToken)
      setUser(mockUser)
      return { success: true }
    }

    try {
      const data = await api.post('/auth/login', credentials)
      const { token, user } = data.data
      localStorage.setItem('archiveX_token', token)
      localStorage.setItem('archiveX_user', JSON.stringify(user))
      setToken(token)
      setUser(user)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const logout = async () => {
    try {
      if (!USE_MOCK_AUTH && token) {
        await api.post('/auth/logout', {})
      }
    } catch {
      // ignore logout errors
    }
    localStorage.removeItem('archiveX_token')
    localStorage.removeItem('archiveX_user')
    setToken(null)
    setUser(null)
    window.location.href = '/login'
  }

  const value = { token, user, login, logout, loading }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
