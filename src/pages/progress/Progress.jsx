import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import AppLayout from '../../components/layout/AppLayout'
import { modules } from '../../data/modules'
import { quizzes } from '../../data/quizzes'
import { CheckCircle, Clock, Trophy, TrendingUp, BookOpen, HelpCircle, AlertCircle } from 'lucide-react'

const ACHIEVEMENTS = [
  { id: 'first-steps', name: 'First Steps', icon: '🌱', description: 'Complete your first module', color: 'border-emerald-200 bg-emerald-50', textColor: 'text-emerald-700' },
  { id: 'scam-spotter', name: 'Scam Spotter', icon: '🎣', description: 'Complete Phishing & Scams module', color: 'border-red-200 bg-red-50', textColor: 'text-red-700' },
  { id: 'privacy-protector', name: 'Privacy Protector', icon: '🔒', description: 'Complete Online Privacy module', color: 'border-purple-200 bg-purple-50', textColor: 'text-purple-700' },
  { id: 'learning-champion', name: 'Learning Champion', icon: '🏆', description: 'Complete 5 learning modules', color: 'border-amber-200 bg-amber-50', textColor: 'text-amber-700' },
]

function checkAchievements(completedModuleIds) {
  const earned = new Set()
  if (completedModuleIds.length >= 1) earned.add('first-steps')
  if (completedModuleIds.includes('phishing-scams')) earned.add('scam-spotter')
  if (completedModuleIds.includes('online-privacy')) earned.add('privacy-protector')
  if (completedModuleIds.length >= 5) earned.add('learning-champion')
  return earned
}

function ProgressBar({ value, max, color = 'bg-blue-600' }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100)
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-semibold text-slate-500">
        <span>{value} of {max}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full progress-fill ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function Progress() {
  const { user, configured } = useAuth()
  const [progressData, setProgressData] = useState([])
  const [attempts, setAttempts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchData()
    else setLoading(false)
  }, [user])

  async function fetchData() {
    try {
      const [{ data: prog }, { data: att }] = await Promise.all([
        supabase.from('lesson_progress').select('module_id, status, completed_at, started_at').eq('user_id', user.id),
        supabase.from('quiz_attempts').select('quiz_id, score, total_questions, submitted_at').eq('user_id', user.id).order('submitted_at', { ascending: false }),
      ])
      setProgressData(prog || [])
      setAttempts(att || [])
    } catch {
      // Not configured
    } finally {
      setLoading(false)
    }
  }

  const progressMap = {}
  progressData.forEach(p => { progressMap[p.module_id] = p })

  const completedIds = progressData.filter(p => p.status === 'completed').map(p => p.module_id)
  const earnedAchievements = checkAchievements(completedIds)

  const avgScore = attempts.length > 0
    ? Math.round(attempts.reduce((s, a) => s + (a.score / a.total_questions) * 100, 0) / attempts.length)
    : null

  const bestScore = attempts.length > 0
    ? Math.max(...attempts.map(a => Math.round((a.score / a.total_questions) * 100)))
    : null

  function quizTitle(quizId) {
    return quizzes.find(q => q.id === quizId)?.title || quizId
  }

  if (!configured) {
    return (
      <AppLayout>
        <div className="max-w-md mx-auto text-center py-20">
          <AlertCircle size={40} className="text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Supabase Not Configured</h2>
          <p className="text-slate-500">Connect Supabase to track your learning progress, quiz scores, and achievements.</p>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">My Progress</h2>
        <p className="text-slate-500">Track your learning journey and achievements.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-white rounded-2xl border border-slate-100 shimmer" />)}
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { icon: BookOpen, label: 'Modules Done', value: completedIds.length, sub: `of ${modules.length}`, color: 'bg-blue-100 text-blue-600' },
              { icon: TrendingUp, label: 'In Progress', value: progressData.filter(p => p.status === 'in_progress').length, color: 'bg-amber-100 text-amber-600' },
              { icon: HelpCircle, label: 'Quiz Attempts', value: attempts.length, color: 'bg-purple-100 text-purple-600' },
              { icon: Trophy, label: 'Best Score', value: bestScore !== null ? `${bestScore}%` : '—', color: 'bg-emerald-100 text-emerald-600' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} flex-shrink-0`}>
                  <s.icon size={18} />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 leading-none mb-1">{s.value}</p>
                  <p className="text-xs font-semibold text-slate-500">{s.label}</p>
                  {s.sub && <p className="text-xs text-slate-400">{s.sub}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Overall bar */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-6">
            <h3 className="font-bold text-slate-900 text-base mb-4">Overall Completion</h3>
            <ProgressBar value={completedIds.length} max={modules.length} color="bg-blue-600" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Module list */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-bold text-slate-900 text-base mb-4">Learning Modules</h3>
              <div className="space-y-2">
                {modules.map(mod => {
                  const prog = progressMap[mod.id]
                  const status = prog?.status || 'not_started'
                  return (
                    <div key={mod.id} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                      <span className="text-xl flex-shrink-0">{mod.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{mod.title}</p>
                        <p className="text-xs text-slate-400">{mod.difficulty}</p>
                      </div>
                      {status === 'completed' ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex-shrink-0">
                          <CheckCircle size={10} /> Done
                        </span>
                      ) : status === 'in_progress' ? (
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex-shrink-0">In Progress</span>
                      ) : (
                        <Link to={`/learn/${mod.slug}`} className="text-xs font-bold text-blue-600 hover:text-blue-700 no-underline flex-shrink-0">Start →</Link>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quiz attempts */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-bold text-slate-900 text-base mb-4">Quiz History</h3>
              {attempts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-400 text-sm mb-3">No quiz attempts yet.</p>
                  <Link to="/quiz" className="btn-primary text-sm py-2.5 px-5">Take a Quiz</Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {attempts.slice(0, 10).map((a, i) => {
                    const pct = Math.round((a.score / a.total_questions) * 100)
                    return (
                      <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 ${pct >= 80 ? 'bg-emerald-100 text-emerald-700' : pct >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                          }`}>
                          {pct}%
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">{quizTitle(a.quiz_id)}</p>
                          <p className="text-xs text-slate-400">{a.score}/{a.total_questions} correct · {new Date(a.submitted_at).toLocaleDateString('en-IN')}</p>
                        </div>
                      </div>
                    )
                  })}
                  {avgScore !== null && (
                    <p className="text-xs text-slate-500 pt-2 font-semibold">Average score: {avgScore}%</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-bold text-slate-900 text-base mb-4">Achievements</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {ACHIEVEMENTS.map(ach => {
                const earned = earnedAchievements.has(ach.id)
                return (
                  <div
                    key={ach.id}
                    className={`rounded-2xl border p-4 text-center transition-all ${earned ? ach.color : 'border-slate-100 bg-slate-50 opacity-50'
                      }`}
                  >
                    <div className="text-3xl mb-2">{ach.icon}</div>
                    <p className={`font-bold text-sm mb-1 ${earned ? ach.textColor : 'text-slate-400'}`}>{ach.name}</p>
                    <p className="text-xs text-slate-500 leading-tight">{ach.description}</p>
                    {earned && <p className="text-xs text-emerald-600 font-bold mt-2">✓ Earned</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </AppLayout>
  )
}

