import { useState, useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { getModuleBySlug } from '../../data/modules'
import AppLayout from '../../components/layout/AppLayout'
import { ChevronLeft, ChevronRight, CheckCircle, Clock, ArrowRight, AlertCircle, BookOpen } from 'lucide-react'

function SectionContent({ section }) {
  return (
    <div className="space-y-5">
      {section.content.split('\n\n').map((para, i) => (
        <p key={i} className="text-slate-700 leading-relaxed text-base"
          dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}
        />
      ))}

      {section.warnings?.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-1">
          {section.warnings.map((w, i) => (
            <div key={i} className="flex items-start gap-2">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 font-medium">{w}</p>
            </div>
          ))}
        </div>
      )}

      {(section.dos?.length > 0 || section.donts?.length > 0) && (
        <div className="grid sm:grid-cols-2 gap-4">
          {section.dos?.length > 0 && (
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <p className="font-bold text-emerald-800 text-sm mb-2">✓ Do</p>
              <ul className="space-y-1.5">
                {section.dos.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-emerald-900">
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">•</span>{d}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {section.donts?.length > 0 && (
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <p className="font-bold text-red-800 text-sm mb-2">✗ Don't</p>
              <ul className="space-y-1.5">
                {section.donts.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-900">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>{d}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {section.tips?.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-1">
          {section.tips.map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-blue-500 flex-shrink-0">💡</span>
              <p className="text-sm text-blue-800">{t}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ModulePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { user, configured } = useAuth()
  const mod = getModuleBySlug(slug)

  const [sectionIndex, setSectionIndex] = useState(0)
  const [status, setStatus] = useState('not_started')
  const [marking, setMarking] = useState(false)
  const [markedComplete, setMarkedComplete] = useState(false)
  const [progressSaved, setProgressSaved] = useState(false)
  const startedRef = useRef(false)
  const topRef = useRef(null)

  useEffect(() => {
    setSectionIndex(0)
    setMarkedComplete(false)
    setStatus('not_started')
    if (!mod || !user) return
    fetchAndStart()
  }, [slug, user])

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [sectionIndex])

  async function fetchAndStart() {
    try {
      const { data } = await supabase
        .from('lesson_progress')
        .select('status')
        .eq('user_id', user.id)
        .eq('module_id', mod.id)
        .single()

      const currentStatus = data?.status || 'not_started'
      setStatus(currentStatus)
      if (currentStatus === 'completed') setMarkedComplete(true)

      if (currentStatus !== 'completed') {
        await supabase.from('lesson_progress').upsert({
          user_id: user.id,
          module_id: mod.id,
          status: 'in_progress',
          started_at: data?.started_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id,module_id' })
      }
    } catch {
      // Supabase not configured
    }
  }

  async function handleMarkComplete() {
    if (marking || markedComplete) return
    setMarking(true)
    try {
      if (configured && user) {
        await supabase.from('lesson_progress').upsert({
          user_id: user.id,
          module_id: mod.id,
          status: 'completed',
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          started_at: new Date().toISOString(),
        }, { onConflict: 'user_id,module_id' })
      }
      setMarkedComplete(true)
      setStatus('completed')
    } catch (err) {
      console.error('Complete error:', err)
    } finally {
      setMarking(false)
    }
  }

  if (!mod) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Module not found</h2>
          <p className="text-slate-500 mb-6">We couldn't find a module for "{slug}".</p>
          <Link to="/learn" className="btn-primary">Back to Learning Library</Link>
        </div>
      </AppLayout>
    )
  }

  const sections = mod.sections || []
  const isLast = sectionIndex === sections.length - 1
  const currentSection = sections[sectionIndex]

  return (
    <AppLayout>
      <div ref={topRef} />

      {/* Back link */}
      <Link to="/learn" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 no-underline mb-6 font-semibold">
        <ChevronLeft size={16} /> Back to Learning Library
      </Link>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar TOC */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-2xl border border-slate-100 p-4 sticky top-24">
            <div className="text-2xl mb-2">{mod.icon}</div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">{mod.title}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
              <Clock size={11} /> {mod.estimatedMinutes} min
              <span className={`px-2 py-0.5 rounded-full font-semibold ${mod.tagColor}`}>{mod.difficulty}</span>
            </div>

            <div className="space-y-1">
              {sections.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSectionIndex(i)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${i === sectionIndex
                      ? 'bg-blue-600 text-white'
                      : i < sectionIndex
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                >
                  <span className="mr-2">{i < sectionIndex ? '✓' : `${i + 1}.`}</span>
                  {s.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Module header (shown at first section) */}
          {sectionIndex === 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
              <h1 className="text-2xl font-extrabold text-slate-900 mb-2">{mod.title}</h1>
              <p className="text-slate-500 mb-4">{mod.description}</p>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="font-bold text-blue-800 text-sm mb-2">🎯 What you'll learn</p>
                <ul className="space-y-1">
                  {mod.objectives.map((obj, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-blue-900">
                      <CheckCircle size={13} className="text-blue-500 flex-shrink-0" />{obj}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Section content */}
          {!markedComplete && currentSection && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Section {sectionIndex + 1} of {sections.length}</span>
                <div className="flex gap-1">
                  {sections.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all ${i < sectionIndex ? 'w-4 bg-emerald-500' : i === sectionIndex ? 'w-6 bg-blue-600' : 'w-4 bg-slate-200'
                      }`} />
                  ))}
                </div>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 mb-5">{currentSection.title}</h2>
              <SectionContent section={currentSection} />
            </div>
          )}

          {/* Complete state */}
          {markedComplete && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 mb-6 text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-xl font-extrabold text-emerald-900 mb-2">Module Complete!</h2>
              <p className="text-emerald-700 mb-6">You've finished <strong>{mod.title}</strong>. Great work!</p>

              <div className="bg-white rounded-xl p-5 border border-emerald-100 text-left mb-6">
                <p className="font-bold text-slate-800 text-sm mb-3">🔑 Key Takeaways</p>
                <ul className="space-y-2">
                  {mod.keyTakeaways.map((k, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>{k}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to={`/quiz/${mod.relatedQuizId}`} className="btn-primary gap-2">
                  Take the Quiz <ArrowRight size={16} />
                </Link>
                <Link to="/learn" className="btn-secondary">Back to Library</Link>
              </div>
            </div>
          )}

          {/* Navigation */}
          {!markedComplete && (
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setSectionIndex(i => Math.max(0, i - 1))}
                disabled={sectionIndex === 0}
                className="btn-secondary text-sm py-2.5 px-5 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ChevronLeft size={15} /> Previous
              </button>

              {!isLast ? (
                <button
                  onClick={() => setSectionIndex(i => i + 1)}
                  className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2"
                >
                  Next <ChevronRight size={15} />
                </button>
              ) : (
                <button
                  onClick={handleMarkComplete}
                  disabled={marking}
                  className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
                >
                  {marking ? 'Saving…' : ''}
                  <CheckCircle size={15} />
                  {marking ? '' : 'Mark as Complete'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

