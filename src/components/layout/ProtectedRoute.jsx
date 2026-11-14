import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl animate-pulse">
            🛡️
          </div>
          <p className="text-sm text-slate-500 font-medium">Loading…</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children
}

