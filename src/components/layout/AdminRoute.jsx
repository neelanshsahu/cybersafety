import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminRoute({ children }) {
  const { user, profile, loading, isAdmin } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl animate-pulse">🛡️</div>
      </div>
    )
  }

  if (!user) return <Navigate to="/signin" replace />
  if (!isAdmin) return <Navigate to="/dashboard" replace />

  return children
}

