import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import AppLayout from '../../components/layout/AppLayout'
import { User, Mail, Shield, LogOut, Lock, Check, AlertCircle, Eye, EyeOff, ChevronRight } from 'lucide-react'

const USER_CATEGORIES = ['Student', 'Parent', 'Teacher', 'Senior Citizen', 'General Internet User', 'Other']

export default function Profile() {
  const { user, profile, updateProfile, updatePassword, signOut } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [userCategory, setUserCategory] = useState(profile?.user_category || '')
  const [profileMsg, setProfileMsg] = useState(null)
  const [savingProfile, setSavingProfile] = useState(false)

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pwMsg, setPwMsg] = useState(null)
  const [savingPw, setSavingPw] = useState(false)

  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : (user?.email?.[0] || 'U').toUpperCase()

  async function handleProfileSave(e) {
    e.preventDefault()
    if (!fullName.trim()) return
    setSavingProfile(true)
    setProfileMsg(null)
    const { error } = await updateProfile({ full_name: fullName.trim(), user_category: userCategory })
    setSavingProfile(false)
    setProfileMsg(error ? { type: 'error', text: error.message } : { type: 'success', text: 'Profile updated.' })
    setTimeout(() => setProfileMsg(null), 4000)
  }

  async function handlePasswordSave(e) {
    e.preventDefault()
    if (newPassword.length < 8) return setPwMsg({ type: 'error', text: 'Password must be at least 8 characters.' })
    if (newPassword !== confirmPassword) return setPwMsg({ type: 'error', text: 'Passwords do not match.' })
    setSavingPw(true)
    setPwMsg(null)
    const { error } = await updatePassword(newPassword)
    setSavingPw(false)
    if (error) {
      setPwMsg({ type: 'error', text: error.message })
    } else {
      setPwMsg({ type: 'success', text: 'Password updated successfully.' })
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setPwMsg(null), 4000)
    }
  }

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="mb-2">
          <h2 className="text-2xl font-extrabold text-slate-900">Profile & Settings</h2>
        </div>

        {/* Account card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xl font-black">
              {initials}
            </div>
            <div>
              <p className="text-lg font-extrabold text-slate-900">{profile?.full_name || '—'}</p>
              <p className="text-sm text-slate-500">{user?.email}</p>
              {profile?.user_category && (
                <span className="inline-block mt-1 text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  {profile.user_category}
                </span>
              )}
            </div>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-4">
            <span>Member since {new Date(user?.created_at || Date.now()).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}</span>
            {profile?.role === 'admin' && (
              <span className="bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">Admin</span>
            )}
          </div>
        </div>

        {/* Edit profile */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
            <User size={16} className="text-blue-600" /> Edit Profile
          </h3>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 bg-white text-sm"
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">I am a…</label>
              <select
                value={userCategory}
                onChange={e => setUserCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 bg-white text-sm"
              >
                <option value="">Select category</option>
                {USER_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {profileMsg && (
              <div className={`flex items-center gap-2 text-sm px-4 py-3 rounded-xl ${profileMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                }`}>
                {profileMsg.type === 'success' ? <Check size={15} /> : <AlertCircle size={15} />}
                {profileMsg.text}
              </div>
            )}

            <button type="submit" disabled={savingProfile} className="btn-primary text-sm py-2.5 px-5 disabled:opacity-60">
              {savingProfile ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Change password */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
            <Lock size={16} className="text-blue-600" /> Change Password
          </h3>
          <form onSubmit={handlePasswordSave} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 bg-white text-sm"
                  placeholder="Min. 8 characters"
                  minLength={8}
                  required
                />
                <button type="button" onClick={() => setShowNew(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 bg-white text-sm"
                  placeholder="Repeat new password"
                  required
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {pwMsg && (
              <div className={`flex items-center gap-2 text-sm px-4 py-3 rounded-xl ${pwMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                }`}>
                {pwMsg.type === 'success' ? <Check size={15} /> : <AlertCircle size={15} />}
                {pwMsg.text}
              </div>
            )}

            <button type="submit" disabled={savingPw} className="btn-primary text-sm py-2.5 px-5 disabled:opacity-60">
              {savingPw ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Legal & sign out */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-3">
          <h3 className="font-bold text-slate-900 text-base mb-2">Account</h3>
          <Link to="/privacy" className="flex items-center justify-between py-2 text-sm text-slate-700 hover:text-blue-600 no-underline">
            Privacy Policy <ChevronRight size={15} className="text-slate-400" />
          </Link>
          <Link to="/terms" className="flex items-center justify-between py-2 text-sm text-slate-700 hover:text-blue-600 no-underline border-t border-slate-50">
            Terms of Use <ChevronRight size={15} className="text-slate-400" />
          </Link>

          <div className="pt-2 border-t border-slate-100">
            {!showSignOutConfirm ? (
              <button
                onClick={() => setShowSignOutConfirm(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 font-semibold text-sm transition-colors"
              >
                <LogOut size={15} /> Sign Out
              </button>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-red-800 mb-3">Are you sure you want to sign out?</p>
                <div className="flex gap-3">
                  <button onClick={handleSignOut} className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-red-700 transition-colors">
                    Yes, sign out
                  </button>
                  <button onClick={() => setShowSignOutConfirm(false)} className="btn-secondary text-sm py-2 px-4">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

