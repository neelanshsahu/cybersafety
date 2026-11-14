import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const USER_CATEGORIES = [
  'Student',
  'Parent',
  'Teacher',
  'Senior Citizen',
  'General Internet User',
]

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function getPasswordStrength(password) {
  if (!password) return null
  if (password.length < 6) return 'weak'
  const hasUpper = /[A-Z]/.test(password)
  const hasLower = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSymbol = /[^A-Za-z0-9]/.test(password)
  const score = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length
  if (password.length >= 8 && score >= 3) return 'strong'
  if (password.length >= 8 && score >= 2) return 'fair'
  return 'weak'
}

const strengthConfig = {
  weak:   { label: 'Weak',   color: 'bg-red-400',    text: 'text-red-500',    bars: 1 },
  fair:   { label: 'Fair',   color: 'bg-amber-400',  text: 'text-amber-500',  bars: 2 },
  strong: { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600', bars: 3 },
}

function PasswordStrengthBar({ password }) {
  const strength = getPasswordStrength(password)
  if (!strength) return null
  const cfg = strengthConfig[strength]
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3].map(n => (
          <div
            key={n}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${n <= cfg.bars ? cfg.color : 'bg-slate-200'}`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${cfg.text}`}>{cfg.label} password</p>
    </div>
  )
}

export default function SignUp() {
  const { user, signUp, configured } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userCategory, setUserCategory] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  function validate() {
    const errs = {}
    if (!fullName.trim()) errs.fullName = 'Full name is required.'
    if (!email.trim()) errs.email = 'Email is required.'
    else if (!validateEmail(email)) errs.email = 'Enter a valid email address.'
    if (!password) errs.password = 'Password is required.'
    else if (password.length < 8) errs.password = 'Password must be at least 8 characters.'
    if (!confirmPassword) errs.confirmPassword = 'Please confirm your password.'
    else if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match.'
    if (!userCategory) errs.userCategory = 'Please select a category.'
    if (!agreedToTerms) errs.terms = 'You must agree to the Privacy Policy and Terms.'
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
      const { data, error } = await signUp({
        email: email.trim(),
        password,
        fullName: fullName.trim(),
        userCategory,
      })
      if (error) {
        setAuthError(error.message || 'Sign-up failed. Please try again.')
      } else {
        // If email confirmation is required, session will be null
        if (data?.session) {
          navigate('/dashboard', { replace: true })
        } else {
          setEmailSent(true)
        }
      }
    } catch (err) {
      setAuthError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Success screen ───────────────────────────────────────────────────────────
  if (emailSent) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-[Manrope,sans-serif]">
        <div className="w-full max-w-md glass-card rounded-2xl p-8 dashboard-shadow text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Check your inbox!</h2>
          <p className="text-slate-500 text-sm mb-6">
            We've sent a confirmation link to{' '}
            <span className="font-semibold text-slate-700">{email}</span>. Click it to activate
            your account and start learning.
          </p>
          <Link
            to="/signin"
            className="btn-primary inline-flex justify-center"
          >
            Go to Sign In
          </Link>
          <p className="mt-4 text-xs text-slate-400">
            Didn't receive it? Check your spam folder or contact support.
          </p>
        </div>
      </div>
    )
  }

  // ── Sign-up form ─────────────────────────────────────────────────────────────
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
              <h1 className="text-xl font-bold text-slate-900">Create your account</h1>
              <p className="text-sm text-slate-500">Join CyberSafe — it's free</p>
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
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="fullName">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={e => { setFullName(e.target.value); setErrors(prev => ({ ...prev, fullName: '' })) }}
                className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} focus:outline-none focus:border-blue-500 text-slate-900 transition-colors`}
                placeholder="Alex Johnson"
                disabled={loading}
              />
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.fullName}
                </p>
              )}
            </div>

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

            {/* User Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="userCategory">
                I am a…
              </label>
              <select
                id="userCategory"
                value={userCategory}
                onChange={e => { setUserCategory(e.target.value); setErrors(prev => ({ ...prev, userCategory: '' })) }}
                className={`w-full px-4 py-3 rounded-xl border ${errors.userCategory ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} focus:outline-none focus:border-blue-500 text-slate-900 transition-colors appearance-none`}
                disabled={loading}
              >
                <option value="">Select your category</option>
                {USER_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.userCategory && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.userCategory}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })) }}
                  className={`w-full px-4 py-3 pr-11 rounded-xl border ${errors.password ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} focus:outline-none focus:border-blue-500 text-slate-900 transition-colors`}
                  placeholder="Min. 8 characters"
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
              {errors.password ? (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.password}
                </p>
              ) : (
                <PasswordStrengthBar password={password} />
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="confirmPassword">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={e => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: '' })) }}
                  className={`w-full px-4 py-3 pr-11 rounded-xl border ${errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} focus:outline-none focus:border-blue-500 text-slate-900 transition-colors`}
                  placeholder="Re-enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms & Privacy */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={e => { setAgreedToTerms(e.target.checked); setErrors(prev => ({ ...prev, terms: '' })) }}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  disabled={loading}
                />
                <span className="text-sm text-slate-600">
                  I agree to CyberSafe's{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2">
                    Terms of Service
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.terms}
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
                  Creating account…
                </span>
              ) : (
                'Create Account →'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
