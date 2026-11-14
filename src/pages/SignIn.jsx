import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function SignIn() {
  const { user, signIn, configured } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [authError, setAuthError] = useState('')

  // Redirect if already authenticated
  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  function validate() {
    const errs = {}
    if (!email.trim()) errs.email = 'Email is required.'
    else if (!validateEmail(email)) errs.email = 'Enter a valid email address.'
    if (!password) errs.password = 'Password is required.'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setAuthError('')
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setLoading(true)
    try {
      const { error } = await signIn({ email: email.trim(), password })
      if (error) {
        setAuthError(error.message || 'Sign-in failed. Please try again.')
      } else {
        navigate('/dashboard', { replace: true })
      }
    } catch (err) {
      setAuthError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-[Manrope,sans-serif]">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>

        {/* Supabase not configured warning */}
        {!configured && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
            <AlertCircle size={18} className="shrink-0 mt-0.5 text-amber-500" />
            <span>
              <strong>Supabase not configured.</strong> Auth won't work until you add your{' '}
              <code className="font-mono bg-amber-100 px-1 rounded">VITE_SUPABASE_URL</code> and{' '}
              <code className="font-mono bg-amber-100 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> to{' '}
              <code className="font-mono bg-amber-100 px-1 rounded">.env</code>.
            </span>
          </div>
        )}

        <div className="glass-card rounded-2xl p-8 dashboard-shadow">
          {/* Header */}
          <div className="flex items-center gap-3 mb-7">
            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl shrink-0">
              🛡️
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Welcome back</h1>
              <p className="text-sm text-slate-500">Sign in to CyberSafe</p>
            </div>
          </div>

          {/* Global auth error */}
          {authError && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-5 text-sm text-red-700">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-500" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })) }}
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} focus:outline-none focus:border-blue-500 text-slate-900 transition-colors`}
                placeholder="you@example.com"
                disabled={loading}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })) }}
                  className={`w-full px-4 py-3 pr-11 rounded-xl border ${errors.password ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} focus:outline-none focus:border-blue-500 text-slate-900 transition-colors`}
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                'Sign In →'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
