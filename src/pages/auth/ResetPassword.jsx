import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function ResetPassword() {
  const { updatePassword, user } = useAuth()
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [globalError, setGlobalError] = useState('')
  const [success, setSuccess] = useState(false)

  // Supabase sets the session from the URL hash automatically via onAuthStateChange.
  // If a user somehow lands here without a recovery session, we can't proceed.
  const [sessionReady, setSessionReady] = useState(false)

  useEffect(() => {
    // The hash fragment #access_token=...&type=recovery is processed by Supabase's
    // onAuthStateChange listener (in AuthContext). Once user is set by that listener,
    // we know the recovery session is active.
    if (user) setSessionReady(true)
  }, [user])

  function validate() {
    const errs = {}
    if (!newPassword) errs.newPassword = 'New password is required.'
    else if (newPassword.length < 8) errs.newPassword = 'Password must be at least 8 characters.'
    if (!confirmPassword) errs.confirmPassword = 'Please confirm your new password.'
    else if (newPassword !== confirmPassword) errs.confirmPassword = 'Passwords do not match.'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setGlobalError('')
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setLoading(true)
    try {
      const { error } = await updatePassword(newPassword)
      if (error) {
        setGlobalError(error.message || 'Failed to update password. Please try again.')
      } else {
        setSuccess(true)
      }
    } catch {
      setGlobalError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-[Manrope,sans-serif]">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-2xl p-8 dashboard-shadow">
          {/* Header */}
          <div className="flex items-center gap-3 mb-7">
            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl shrink-0">
              🔐
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Set new password</h1>
              <p className="text-sm text-slate-500">Choose a strong, unique password</p>
            </div>
          </div>

          {success ? (
            /* ── Success state ── */
            <div className="text-center py-2">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-emerald-500" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Password updated!</h2>
              <p className="text-sm text-slate-500 mb-6">
                Your password has been changed successfully. You can now sign in with your new
                password.
              </p>
              <Link to="/signin" className="btn-primary inline-flex justify-center">
                Go to Sign In
              </Link>
            </div>
          ) : !sessionReady ? (
            /* ── No recovery session ── */
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={28} className="text-amber-500" />
              </div>
              <h2 className="text-base font-bold text-slate-900 mb-2">Invalid or expired link</h2>
              <p className="text-sm text-slate-500 mb-6">
                This password reset link is invalid or has already been used. Please request a new
                one.
              </p>
              <Link to="/forgot-password" className="btn-primary inline-flex justify-center">
                Request New Link
              </Link>
              <p className="mt-4 text-sm text-slate-500">
                <Link to="/signin" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Back to Sign In
                </Link>
              </p>
            </div>
          ) : (
            /* ── Reset form ── */
            <>
              {globalError && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-5 text-sm text-red-700">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-500" />
                  <span>{globalError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* New Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="newPassword">
                    New password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showNew ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={e => { setNewPassword(e.target.value); setErrors(prev => ({ ...prev, newPassword: '' })) }}
                      className={`w-full px-4 py-3 pr-11 rounded-xl border ${errors.newPassword ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} focus:outline-none focus:border-blue-500 text-slate-900 transition-colors`}
                      placeholder="Min. 8 characters"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      tabIndex={-1}
                      aria-label={showNew ? 'Hide password' : 'Show password'}
                    >
                      {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="confirmPassword">
                    Confirm new password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={e => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: '' })) }}
                      className={`w-full px-4 py-3 pr-11 rounded-xl border ${errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} focus:outline-none focus:border-blue-500 text-slate-900 transition-colors`}
                      placeholder="Re-enter your new password"
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
                      Updating password…
                    </span>
                  ) : (
                    'Update Password →'
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                <Link to="/signin" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Back to Sign In
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
