import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import AppLayout from '../../components/layout/AppLayout'
import { quizzes } from '../../data/quizzes'
import { modules } from '../../data/modules'
import { HelpCircle, Trophy, ChevronRight, CheckCircle, Clock } from 'lucide-react'

export default function QuizLibrary() {
  const { user } = useAuth()
  const [bestScores, setBestScores] = useState({})
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (user) fetchAttempts()
    else setLoading(false)
  }, [user])

  async function fetchAttempts() {
    try {
      const { data } = await supabase
        .from('quiz_attempts')
        .select('quiz_id, score, total_questions')
        .eq('user_id', user.id)

      const scores = {}
        ; (data || []).forEach(a => {
          const pct = Math.round((a.score / a.total_questions) * 100)
          if (!scores[a.quiz_id] || pct > scores[a.quiz_id]) scores[a.quiz_id] = pct
        })
      setBestScores(scores)
    } catch {
      // Not configured
    } finally {
      setLoading(false)
    }
  }

  const filtered = quizzes.filter(q => {
    if (filter === 'attempted') return q.id in bestScores
    if (filter === 'not_attempted') return !(q.id in bestScores)
    return true
  })

  function getModule(quiz) {
    return modules.find(m => m.id === quiz.moduleId)
  }

  return (
    <AppLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Quizzes</h2>
        <p className="text-slate-500">Test your knowledge and reinforce what you've learned.</p>
      </div>

      <div className="flex gap-2 mb-6">
        {[['all', 'All Quizzes'], ['attempted', 'Attempted'], ['not_attempted', 'Not Yet Done']].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setFilter(val)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${filter === val ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(quiz => {
          const mod = getModule(quiz)
          const best = bestScores[quiz.id]
          const attempted = best !== undefined
          return (
            <div key={quiz.id} className="bg-white rounded-2xl border border-slate-100 p-5 card-hover flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-2xl">
                  {mod?.icon || '🎯'}
                </div>
                {attempted && (
                  <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full border ${best >= 80 ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : best >= 60 ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                    <Trophy size={11} /> {best}%
                  </div>
                )}
              </div>

              <h3 className="font-bold text-slate-900 text-base mb-1">{quiz.title}</h3>
              {mod && <p className="text-xs text-slate-400 font-medium mb-2">Module: {mod.title}</p>}
              <p className="text-sm text-slate-500 mb-3 flex-1">{quiz.description}</p>

              <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                <HelpCircle size={12} /> {quiz.questions.length} questions
                {attempted && <span className="ml-auto text-emerald-600 font-semibold flex items-center gap-1"><CheckCircle size={11} /> Attempted</span>}
              </div>

              <Link
                to={`/quiz/${quiz.id}`}
                className="btn-primary text-xs py-2.5 justify-center"
              >
                {attempted ? 'Retake Quiz' : 'Start Quiz'} →
              </Link>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-400 mb-2">No quizzes match this filter.</p>
          <button onClick={() => setFilter('all')} className="text-blue-600 text-sm font-semibold">Show all</button>
        </div>
      )}
    </AppLayout>
  )
}

