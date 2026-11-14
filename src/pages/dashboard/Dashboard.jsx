import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { modules } from '../../data/modules'
import AppLayout from '../../components/layout/AppLayout'
import { BookOpen, HelpCircle, TrendingUp, Award, ChevronRight, ArrowRight, Clock } from 'lucide-react'

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-start gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon size={20} className="text-current" />
      </div>
      <div>
        <p className="text-2xl font-extrabold text-slate-900 leading-none mb-1">{value}</p>
        <p className="text-xs font-semibold text-slate-500">{label}</p>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return <div className="bg-white rounded-2xl p-5 border border-slate-100 h-20 shimmer" />
}

export default function Dashboard() {
  const { user, profile } = useAuth()
  const [stats, setStats] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [continueModule, setContinueModule] = useState(null)
  const [loading, setLoading] = useState(true)

  const firstName = profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there'

  useEffect(() => {
    if (user) loadDashboardData()
  }, [user])

  async function loadDashboardData() {
    try {
      setLoading(true)

      // Fetch lesson progress (no join — module_id is a text slug, not a UUID FK to join)
      const { data: progress, error: progressError } = await supabase
        .from('lesson_progress')
        .select('module_id, status, started_at, updated_at, completed_at')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (progressError) console.warn('Progress fetch error:', progressError.message)

      // Fetch quiz attempts
      const { data: attempts, error: attemptsError } = await supabase
        .from('quiz_attempts')
        .select('quiz_id, score, total_questions, submitted_at')
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: false })

      if (attemptsError) console.warn('Attempts fetch error:', attemptsError.message)

      const progressList = progress || []
      const attemptsList = attempts || []

      const completed = progressList.filter(p => p.status === 'completed').length
      const inProgress = progressList.filter(p => p.status === 'in_progress')
      const totalAttempts = attemptsList.length
      const avgScore = totalAttempts > 0
        ? Math.round(attemptsList.reduce((sum, a) => sum + (a.score / a.total_questions) * 100, 0) / totalAttempts)
        : 0

      setStats({
        modulesCompleted: completed,
        quizAttempts: totalAttempts,
        avgScore,
        achievements: completed >= 1 ? (completed >= 5 ? 2 : 1) : 0,
      })

      // Find the most recently started incomplete module & enrich from local data
      if (inProgress.length > 0) {
        const localMod = modules.find(m => m.id === inProgress[0].module_id)
        setContinueModule({ ...inProgress[0], _local: localMod })
      }

      // Build recent activity from progress + attempts using local module data
      const activity = [
        ...progressList.slice(0, 3).map(p => {
          const localMod = modules.find(m => m.id === p.module_id)
          return {
            type: p.status === 'completed' ? 'completed' : 'started',
            label: localMod?.title || p.module_id,
            time: p.updated_at,
            icon: localMod?.icon || '📚',
          }
        }),
        ...attemptsList.slice(0, 2).map(a => ({
          type: 'quiz',
          label: `Quiz — ${Math.round((a.score / a.total_questions) * 100)}% score`,
          time: a.submitted_at,
          icon: '🎯',
        })),
      ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5)

      setRecentActivity(activity)
    } catch (err) {
      console.error('Dashboard load error:', err)
    } finally {
      setLoading(false)
    }
  }

  function timeAgo(dateStr) {
    if (!dateStr) return ''
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  // Recommended modules based on category
  const categoryModules = {
    Student: ['social-media-safety', 'cyberbullying', 'password-security'],
    Parent: ['cyberbullying', 'social-media-safety', 'phishing-scams'],
    Teacher: ['cyberbullying', 'misinformation', 'social-media-safety'],
    'Senior Citizen': ['digital-payments', 'phishing-scams', 'smartphone-security'],
    default: ['password-security', 'phishing-scams', 'digital-payments'],
  }
  const recommended = categoryModules[profile?.user_category] || categoryModules.default

  const statCards = [
    { icon: BookOpen, label: 'Modules Completed', value: stats?.modulesCompleted ?? 0, color: 'bg-blue-100 text-blue-600' },
    { icon: HelpCircle, label: 'Quizzes Attempted', value: stats?.quizAttempts ?? 0, color: 'bg-purple-100 text-purple-600' },
    { icon: TrendingUp, label: 'Avg Quiz Score', value: stats?.quizAttempts ? `${stats.avgScore}%` : '—', color: 'bg-emerald-100 text-emerald-600' },
    { icon: Award, label: 'Achievements', value: stats?.achievements ?? 0, color: 'bg-amber-100 text-amber-600' },
  ]

  return (
    <AppLayout>
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {firstName} 👋
        </h2>
        <p className="text-slate-500">
          {stats?.modulesCompleted === 0
            ? "Welcome to CyberSafe! Start your first lesson to begin your digital safety journey."
            : `You've completed ${stats?.modulesCompleted} module${stats?.modulesCompleted !== 1 ? 's' : ''}. Keep going!`}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : statCards.map(c => <StatCard key={c.label} {...c} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Continue / Start Learning */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue learning */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-bold text-slate-900 text-base mb-4">
              {continueModule ? '▶ Continue Learning' : '🚀 Start Learning'}
            </h3>
            {loading ? (
              <div className="h-20 shimmer rounded-xl" />
            ) : continueModule ? (() => {
              const localMod = continueModule._local || modules.find(m => m.id === continueModule.module_id)
              const modTitle = localMod?.title || continueModule.module_id
              const modSlug = localMod?.slug || continueModule.module_id
              const modIcon = localMod?.icon || '📚'
              const modMins = localMod?.estimatedMinutes || 10
              return (
                <Link
                  to={`/learn/${modSlug}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-colors no-underline"
                >
                  <span className="text-3xl">{modIcon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm truncate">
                      {modTitle}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                      <Clock size={11} />
                      <span>{modMins} min</span>
                      <span className="ml-2 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">In Progress</span>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-blue-600 flex-shrink-0" />
                </Link>
              )
            })() : (
              <div className="text-center py-6">
                <p className="text-slate-500 text-sm mb-4">You haven't started learning yet.</p>
                <Link to="/learn" className="btn-primary text-sm py-2.5 px-5">
                  Explore Learning Modules
                </Link>
              </div>
            )}
          </div>

          {/* Recommended */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-base">Recommended for You</h3>
              <Link to="/learn" className="text-xs text-blue-600 font-semibold hover:text-blue-700 no-underline">View all →</Link>
            </div>
            <div className="space-y-2">
              {recommended.map(slug => (
                <Link
                  key={slug}
                  to={`/learn/${slug}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors no-underline group"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-lg flex-shrink-0">
                    {slug === 'password-security' ? '🔐' : slug === 'phishing-scams' ? '🎣' : slug === 'social-media-safety' ? '📲' : slug === 'digital-payments' ? '💳' : slug === 'cyberbullying' ? '🤝' : slug === 'smartphone-security' ? '📱' : slug === 'misinformation' ? '📰' : '📚'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 capitalize group-hover:text-blue-600 transition-colors">
                      {slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                  </div>
                  <ChevronRight size={15} className="text-slate-300 group-hover:text-blue-400 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Recent Activity */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-bold text-slate-900 text-base mb-4">Recent Activity</h3>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-10 shimmer rounded-lg" />)}
              </div>
            ) : recentActivity.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-slate-400 text-sm">No activity yet.</p>
                <Link to="/learn" className="text-blue-600 text-sm font-semibold hover:text-blue-700 no-underline mt-2 inline-block">
                  Start a module →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{item.label}</p>
                      <p className="text-xs text-slate-400">{timeAgo(item.time)}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${
                      item.type === 'completed' ? 'bg-emerald-100 text-emerald-700'
                        : item.type === 'quiz' ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.type === 'completed' ? 'Done' : item.type === 'quiz' ? 'Quiz' : 'Started'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-bold text-slate-900 text-base mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Take a Quiz', href: '/quiz', icon: '🎯' },
                { label: 'Safety Tools', href: '/tools', icon: '🛡️' },
                { label: 'Resources', href: '/resources', icon: '📂' },
                { label: 'View Progress', href: '/progress', icon: '📊' },
              ].map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors no-underline group"
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{item.label}</span>
                  <ChevronRight size={14} className="ml-auto text-slate-300 group-hover:text-blue-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

