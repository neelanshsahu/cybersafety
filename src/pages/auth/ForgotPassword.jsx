import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function ForgotPassword() {
  const { sendPasswordReset, configured } = useAuth()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Email is required.')
      return
    }
    if (!validateEmail(email)) {
      setError('Enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      const { error: resetError } = await sendPasswordReset(email.trim())
      if (resetError) {
        setError(resetError.message || 'Failed to send reset email. Please try again.')
      } else {
        setSent(true)
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-[Manrope,sans-serif]">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          to="/signin"
          className="inline-flex items-center gap-2 mb-8 text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to sign in
        </Link>

        {/* Supabase not configured warning */}
        {!configured && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
            <AlertCircle size={18} className="shrink-0 mt-0.5 text-amber-500" />
            <span>
              <strong>Supabase not configured.</strong> Password reset emails won't be sent until your{' '}
              <code className="font-mono bg-amber-100 px-1 rounded">.env</code> is set up.
            </span>
          </div>
        )}

        <div className="glass-card rounded-2xl p-8 dashboard-shadow">
          {/* Header */}
          <div className="flex items-center gap-3 mb-7">
            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl shrink-0">
              🔑
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Forgot your password?</h1>
              <p className="text-sm text-slate-500">We'll send you a reset link</p>
            </div>
          </div>

          {sent ? (
            /* ── Success state ── */
            <div className="text-center py-2">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-emerald-500" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Check your inbox!</h2>
              <p className="text-sm text-slate-500 mb-6">
                If an account exists for{' '}
                <span className="font-semibold text-slate-700">{email}</span>, you'll receive a
                password reset link shortly.
              </p>
              <Link to="/signin" className="btn-primary inline-flex justify-center">
                Back to Sign In
              </Link>
              <p className="mt-4 text-xs text-slate-400">
                Didn't receive it? Check your spam folder or{' '}
                <button
                  onClick={() => { setSent(false); setEmail('') }}
                  className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
                >
                  try again
                </button>
                .
              </p>
            </div>
          ) : (
            /* ── Form ── */
            <>
              <p className="text-sm text-slate-500 mb-6">
                Enter the email address associated with your account and we'll email you a link to
                reset your password.
              </p>

              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-5 text-sm text-red-700">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="email">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} focus:outline-none focus:border-blue-500 text-slate-900 transition-colors`}
                    placeholder="you@example.com"
                    disabled={loading}
                  />
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
                      Sending link…
                    </span>
                  ) : (
                    'Send Reset Link →'
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                Remember your password?{' '}
                <Link to="/signin" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
