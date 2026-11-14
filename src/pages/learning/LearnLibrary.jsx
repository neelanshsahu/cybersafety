import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import AppLayout from '../../components/layout/AppLayout'
import { modules } from '../../data/modules'
import { Search, Clock, BookOpen, CheckCircle, ChevronRight } from 'lucide-react'

const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced']
const CATEGORIES = ['All', ...Array.from(new Set(modules.map(m => m.category)))]

function difficultyColor(d) {
  if (d === 'Beginner') return 'bg-emerald-100 text-emerald-700'
  if (d === 'Intermediate') return 'bg-blue-100 text-blue-700'
  if (d === 'Advanced') return 'bg-slate-100 text-slate-700'
  return 'bg-slate-100 text-slate-600'
}

export default function LearnLibrary() {
  const { user } = useAuth()
  const [progressMap, setProgressMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState('All')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    if (user) fetchProgress()
    else setLoading(false)
  }, [user])

  async function fetchProgress() {
    try {
      const { data } = await supabase
        .from('lesson_progress')
        .select('module_id, status')
        .eq('user_id', user.id)

      const map = {}
        ; (data || []).forEach(p => { map[p.module_id] = p.status })
      setProgressMap(map)
    } catch {
      // Supabase not configured
    } finally {
      setLoading(false)
    }
  }

  const filtered = modules.filter(m => {
    const q = search.toLowerCase()
    const matchSearch = !q || m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
    const matchDiff = difficulty === 'All' || m.difficulty === difficulty
    const matchCat = category === 'All' || m.category === category
    return matchSearch && matchDiff && matchCat
  })

  const statusOf = (m) => progressMap[m.id] || 'not_started'

  return (
    <AppLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Learning Modules</h2>
        <p className="text-slate-500">Bite-sized lessons to build your digital safety skills.</p>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6 space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search modules…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${difficulty === d
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                }`}
            >
              {d}
            </button>
          ))}
          <div className="w-px bg-slate-200 mx-1" />
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${category === c
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      {!loading && (
        <div className="flex items-center gap-4 mb-5 text-sm text-slate-500">
          <span>{filtered.length} module{filtered.length !== 1 ? 's' : ''}</span>
          <span className="text-emerald-600 font-semibold">
            {Object.values(progressMap).filter(s => s === 'completed').length} completed
          </span>
        </div>
      )}

      {/* Module grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-400 text-lg mb-2">No modules match your filters.</p>
          <button onClick={() => { setSearch(''); setDifficulty('All'); setCategory('All') }} className="text-blue-600 text-sm font-semibold">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(mod => {
            const status = statusOf(mod)
            return (
              <Link
                key={mod.slug}
                to={`/learn/${mod.slug}`}
                className="bg-white rounded-2xl border border-slate-100 p-5 card-hover flex flex-col no-underline group hover:border-blue-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl border border-slate-100">
                    {mod.icon}
                  </div>
                  {status === 'completed' ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                      <CheckCircle size={11} /> Done
                    </span>
                  ) : status === 'in_progress' ? (
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">In Progress</span>
                  ) : null}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${difficultyColor(mod.difficulty)}`}>{mod.difficulty}</span>
                  <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                    <Clock size={11} />{mod.estimatedMinutes} min
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-blue-600 transition-colors">{mod.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">{mod.description}</p>

                <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:gap-2 gap-1 transition-all">
                  <BookOpen size={14} />
                  {status === 'completed' ? 'Review' : status === 'in_progress' ? 'Continue' : 'Start Lesson'}
                  <ChevronRight size={14} />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </AppLayout>
  )
}

