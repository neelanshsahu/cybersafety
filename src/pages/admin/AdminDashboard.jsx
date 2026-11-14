import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import AppLayout from '../../components/layout/AppLayout'
import { Users, BookOpen, HelpCircle, TrendingUp, ChevronRight, Settings } from 'lucide-react'

function StatCard({ icon: Icon, label, value, color, loading }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-start gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} flex-shrink-0`}>
        <Icon size={18} />
      </div>
      <div>
        {loading ? (
          <div className="h-7 w-16 shimmer rounded mb-1" />
        ) : (
          <p className="text-2xl font-extrabold text-slate-900 leading-none mb-1">{value}</p>
        )}
        <p className="text-xs font-semibold text-slate-500">{label}</p>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const { profile } = useAuth()
  const [stats, setStats] = useState({ users: 0, modules: 0, quizAttempts: 0, completions: 0 })
  const [recentUsers, setRecentUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchStats() }, [])

  async function fetchStats() {
    try {
      const [
        { count: users },
        { count: modules },
        { count: quizAttempts },
        { count: completions },
        { data: recent },
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('learning_modules').select('*', { count: 'exact', head: true }).eq('published', true),
        supabase.from('quiz_attempts').select('*', { count: 'exact', head: true }),
        supabase.from('lesson_progress').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
        supabase.from('profiles').select('id, full_name, user_category, role, created_at').order('created_at', { ascending: false }).limit(10),
      ])
      setStats({ users: users || 0, modules: modules || 0, quizAttempts: quizAttempts || 0, completions: completions || 0 })
      setRecentUsers(recent || [])
    } catch (err) {
      console.error('Admin stats error:', err)
    } finally {
      setLoading(false)
    }
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'Admin'

  return (
    <AppLayout>
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
          <Settings size={12} /> Admin Panel — Restricted Access
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Hello, {firstName}</h2>
        <p className="text-slate-500">Platform overview and administrative tools.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Registered Users" value={stats.users} color="bg-blue-100 text-blue-600" loading={loading} />
        <StatCard icon={BookOpen} label="Published Modules" value={stats.modules} color="bg-emerald-100 text-emerald-600" loading={loading} />
        <StatCard icon={HelpCircle} label="Quiz Attempts" value={stats.quizAttempts} color="bg-purple-100 text-purple-600" loading={loading} />
        <StatCard icon={TrendingUp} label="Lesson Completions" value={stats.completions} color="bg-amber-100 text-amber-600" loading={loading} />
      </div>

      {/* Quick nav */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Manage Modules', href: '/admin/modules', icon: BookOpen, desc: 'Create, edit, publish learning modules' },
          { label: 'Manage Quizzes', href: '/admin/quizzes', icon: HelpCircle, desc: 'Add and edit quiz questions' },
          { label: 'Manage Resources', href: '/admin/resources', icon: TrendingUp, desc: 'Publish educational resources' },
          { label: 'Manage Users', href: '/admin/users', icon: Users, desc: 'View users, manage roles' },
        ].map(item => (
          <Link
            key={item.href}
            to={item.href}
            className="bg-white rounded-2xl border border-slate-100 p-5 card-hover no-underline flex flex-col gap-3 hover:border-blue-200"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <item.icon size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">{item.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
            </div>
            <ChevronRight size={15} className="text-slate-300 mt-auto" />
          </Link>
        ))}
      </div>

      {/* Recent users */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">Recent Users</h3>
          <Link to="/admin/users" className="text-xs text-blue-600 font-semibold no-underline hover:text-blue-700">View all →</Link>
        </div>
        {loading ? (
          <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-10 shimmer rounded-lg" />)}</div>
        ) : recentUsers.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-8">No users registered yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left pb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="text-left pb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="text-left pb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="text-left pb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map(u => (
                  <tr key={u.id} className="border-b border-slate-50 last:border-0">
                    <td className="py-2.5 font-medium text-slate-900">{u.full_name || 'Unnamed'}</td>
                    <td className="py-2.5 text-slate-500">{u.user_category || '—'}</td>
                    <td className="py-2.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                        {u.role || 'user'}
                      </span>
                    </td>
                    <td className="py-2.5 text-slate-400 text-xs">{new Date(u.created_at).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
