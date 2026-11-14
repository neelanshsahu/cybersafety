import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

// Landing & public
import LandingPage from './pages/LandingPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import Privacy from './pages/public/Privacy'
import Terms from './pages/public/Terms'
import Contact from './pages/public/Contact'
import NotFound from './pages/public/NotFound'

// Protected layouts
import ProtectedRoute from './components/layout/ProtectedRoute'
import AdminRoute from './components/layout/AdminRoute'

// Authenticated pages
import Dashboard from './pages/dashboard/Dashboard'
import LearnLibrary from './pages/learning/LearnLibrary'
import ModulePage from './pages/learning/ModulePage'
import QuizLibrary from './pages/quizzes/QuizLibrary'
import QuizPage from './pages/quizzes/QuizPage'
import Tools from './pages/tools/Tools'
import Resources from './pages/resources/Resources'
import Progress from './pages/progress/Progress'
import Profile from './pages/profile/Profile'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminModules from './pages/admin/AdminModules'
import AdminQuizzes from './pages/admin/AdminQuizzes'
import AdminResources from './pages/admin/AdminResources'
import AdminUsers from './pages/admin/AdminUsers'

function AuthRedirect({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<AuthRedirect><SignIn /></AuthRedirect>} />
      <Route path="/signup" element={<AuthRedirect><SignUp /></AuthRedirect>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<Contact />} />

      {/* Authenticated */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/learn" element={<ProtectedRoute><LearnLibrary /></ProtectedRoute>} />
      <Route path="/learn/:slug" element={<ProtectedRoute><ModulePage /></ProtectedRoute>} />
      <Route path="/quiz" element={<ProtectedRoute><QuizLibrary /></ProtectedRoute>} />
      <Route path="/quiz/:id" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
      <Route path="/tools" element={<ProtectedRoute><Tools /></ProtectedRoute>} />
      <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/modules" element={<AdminRoute><AdminModules /></AdminRoute>} />
      <Route path="/admin/quizzes" element={<AdminRoute><AdminQuizzes /></AdminRoute>} />
      <Route path="/admin/resources" element={<AdminRoute><AdminResources /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
