import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import {
  LayoutDashboard, BookOpen, HelpCircle, Shield, Library,
  TrendingUp, User, Settings, LogOut, Menu, X, Bell, ChevronRight
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: BookOpen, label: 'Learn', href: '/learn' },
  { icon: HelpCircle, label: 'Quizzes', href: '/quiz' },
  { icon: Shield, label: 'Safety Tools', href: '/tools' },
  { icon: Library, label: 'Resources', href: '/resources' },
  { icon: TrendingUp, label: 'My Progress', href: '/progress' },
  { icon: User, label: 'Profile', href: '/profile' },
]

function SidebarItem({ item, isActive, onClick }) {
  return (
    <Link
      to={item.href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all no-underline ${
        isActive
          ? 'bg-blue-600 text-white shadow-sm'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <item.icon size={18} className="flex-shrink-0" />
      <span>{item.label}</span>
      {isActive && <ChevronRight size={14} className="ml-auto opacity-60" />}
    </Link>
  )
}

export default function AppLayout({ children }) {
  const { user, profile, signOut, isAdmin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const firstName = profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there'
  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : (user?.email?.[0] || 'U').toUpperCase()

  const pageTitle = navItems.find(n => location.pathname.startsWith(n.href))?.label
    || (location.pathname.startsWith('/admin') ? 'Admin' : 'CyberSafe')

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-slate-100 fixed inset-y-0 left-0 z-30">
        {/* Logo */}
        <div className="px-4 h-16 flex items-center border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2.5 no-underline group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm shadow-sm group-hover:scale-105 transition-transform">
              🛡️
            </div>
            <span className="font-extrabold text-slate-900 text-base tracking-tight">CyberSafe</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Sidebar navigation">
          {navItems.map(item => (
            <SidebarItem
              key={item.href}
              item={item}
              isActive={location.pathname.startsWith(item.href)}
            />
          ))}
          {isAdmin && (
            <div className="pt-4 mt-4 border-t border-slate-100">
              <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Admin</p>
              <Link
                to="/admin"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all no-underline ${
                  location.pathname.startsWith('/admin')
                    ? 'bg-amber-500 text-white'
                    : 'text-amber-600 hover:bg-amber-50'
                }`}
              >
                <Settings size={18} />
                Admin Panel
              </Link>
            </div>
          )}
        </nav>

        {/* User info */}
        <div className="border-t border-slate-100 p-3">
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {initials}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{firstName}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-slate-100 rounded-xl shadow-lg overflow-hidden z-50"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                >
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 no-underline font-medium"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User size={15} /> Profile & Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-medium"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-slate-100 flex items-center justify-between px-4 z-30">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} className="text-slate-700" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs">🛡️</div>
          <span className="font-bold text-slate-900 text-sm">CyberSafe</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
          {initials}
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 flex flex-col md:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between px-4 h-14 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">🛡️</div>
                  <span className="font-extrabold text-slate-900">CyberSafe</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-slate-100">
                  <X size={18} className="text-slate-500" />
                </button>
              </div>

              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map(item => (
                  <SidebarItem
                    key={item.href}
                    item={item}
                    isActive={location.pathname.startsWith(item.href)}
                    onClick={() => setSidebarOpen(false)}
                  />
                ))}
                {isAdmin && (
                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <Link
                      to="/admin"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-amber-600 hover:bg-amber-50 no-underline"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Settings size={18} /> Admin Panel
                    </Link>
                  </div>
                )}
              </nav>

              <div className="border-t border-slate-100 p-3">
                <div className="flex items-center gap-3 px-3 py-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">{initials}</div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{firstName}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl font-medium"
                >
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 md:ml-60 pt-14 md:pt-0 min-w-0">
        {/* Top bar (desktop) */}
        <div className="hidden md:flex items-center justify-between h-16 px-6 border-b border-slate-100 bg-white sticky top-0 z-20">
          <h1 className="text-lg font-bold text-slate-900">{pageTitle}</h1>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">{initials}</div>
              <span className="text-sm font-semibold text-slate-700">{firstName}</span>
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

