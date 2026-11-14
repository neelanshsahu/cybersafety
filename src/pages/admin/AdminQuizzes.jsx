import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import AppLayout from '../../components/layout/AppLayout'
import { Plus, Edit2, Trash2, Check, X, AlertTriangle, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react'

const emptyQuiz = { title: '', description: '', module_id: '', published: false }
const emptyQ = { question_text: '', options: ['', '', '', ''], correct_answer: 0, explanation: '', sort_order: 0 }

export default function AdminQuizzes() {
  const [quizzes, setQuizzes] = useState([])
  const [dbModules, setDbModules] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list') // 'list' | 'quiz-form' | 'questions'
  const [quizForm, setQuizForm] = useState(emptyQuiz)
  const [editQuizId, setEditQuizId] = useState(null)
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [questions, setQuestions] = useState([])
  const [qForm, setQForm] = useState(emptyQ)
  const [editQId, setEditQId] = useState(null)
  const [showQForm, setShowQForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [msg, setMsg] = useState(null)

  useEffect(() => { fetchAll() }, [])

  async function fetchAll() {
    setLoading(true)
    const [{ data: q }, { data: m }] = await Promise.all([
      supabase.from('quizzes').select('*, quiz_questions(count)').order('created_at', { ascending: false }),
      supabase.from('learning_modules').select('id, title, slug').eq('published', true),
    ])
    setQuizzes(q || [])
    setDbModules(m || [])
    setLoading(false)
  }

  async function fetchQuestions(quizId) {
    const { data } = await supabase.from('quiz_questions').select('*').eq('quiz_id', quizId).order('sort_order')
    setQuestions(data || [])
  }

  async function saveQuiz(e) {
    e.preventDefault()
    setSaving(true)
    setMsg(null)
    const payload = { ...quizForm, updated_at: new Date().toISOString() }
    const { error } = editQuizId
      ? await supabase.from('quizzes').update(payload).eq('id', editQuizId)
      : await supabase.from('quizzes').insert({ ...payload, id: payload.id || payload.module_id || ('quiz-' + Date.now()), created_at: new Date().toISOString() })
    setSaving(false)
    if (error) { setMsg({ type: 'error', text: error.message }); return }
    setMsg({ type: 'success', text: editQuizId ? 'Quiz updated.' : 'Quiz created.' })
    setView('list')
    fetchAll()
    setTimeout(() => setMsg(null), 3000)
  }

  async function saveQuestion(e) {
    e.preventDefault()
    setSaving(true)
    const payload = { ...qForm, quiz_id: selectedQuiz.id, options: JSON.stringify(qForm.options) }
    const { error } = editQId
      ? await supabase.from('quiz_questions').update(payload).eq('id', editQId)
      : await supabase.from('quiz_questions').insert({ ...payload, id: payload.id || `${selectedQuiz.id}-q-${Date.now()}` })
    setSaving(false)
    if (error) { setMsg({ type: 'error', text: error.message }); return }
    setMsg({ type: 'success', text: 'Question saved.' })
    setShowQForm(false)
    setEditQId(null)
    setQForm(emptyQ)
    fetchQuestions(selectedQuiz.id)
    setTimeout(() => setMsg(null), 3000)
  }

  async function deleteQuiz(id) {
    await supabase.from('quiz_questions').delete().eq('quiz_id', id)
    await supabase.from('quizzes').delete().eq('id', id)
    setDeleteConfirm(null)
    fetchAll()
  }

  async function deleteQuestion(id) {
    await supabase.from('quiz_questions').delete().eq('id', id)
    fetchQuestions(selectedQuiz.id)
    setDeleteConfirm(null)
  }

  function openQuestions(quiz) {
    setSelectedQuiz(quiz)
    fetchQuestions(quiz.id)
    setView('questions')
  }

  return (
    <AppLayout>
      {msg && (
        <div className={`mb-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm ${msg.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
          {msg.type === 'success' ? <Check size={15} /> : <X size={15} />} {msg.text}
        </div>
      )}

      {/* LIST */}
      {view === 'list' && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Quizzes</h2>
              <p className="text-slate-500 text-sm">Create and manage quiz questions.</p>
            </div>
            <button onClick={() => { setQuizForm(emptyQuiz); setEditQuizId(null); setView('quiz-form') }} className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2">
              <Plus size={15} /> New Quiz
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {loading ? (
              <div className="p-6 space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-12 shimmer rounded-lg" />)}</div>
            ) : quizzes.length === 0 ? (
              <div className="text-center py-16 text-slate-400">No quizzes yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      {['Title', 'Module', 'Questions', 'Published', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {quizzes.map(q => (
                      <tr key={q.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                        <td className="px-4 py-3 font-semibold text-slate-900">{q.title}</td>
                        <td className="px-4 py-3 text-slate-500 text-xs">{dbModules.find(m => m.id === q.module_id)?.title || '—'}</td>
                        <td className="px-4 py-3 text-slate-600">{q.quiz_questions?.[0]?.count || 0}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${q.published ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                            {q.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => openQuestions(q)} className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-2 py-1 rounded-lg hover:bg-blue-50">Questions</button>
                            <button onClick={() => { setQuizForm({ title: q.title, description: q.description || '', module_id: q.module_id || '', published: q.published }); setEditQuizId(q.id); setView('quiz-form') }} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Edit2 size={14} /></button>
                            <button onClick={() => setDeleteConfirm({ type: 'quiz', id: q.id })} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* QUIZ FORM */}
      {view === 'quiz-form' && (
        <>
          <button onClick={() => setView('list')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6 font-semibold"><ChevronLeft size={16} /> Back</button>
          <div className="bg-white rounded-2xl border border-slate-100 p-6 max-w-lg">
            <h2 className="text-xl font-extrabold text-slate-900 mb-5">{editQuizId ? 'Edit Quiz' : 'Create Quiz'}</h2>
            <form onSubmit={saveQuiz} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title *</label>
                <input required value={quizForm.title} onChange={e => setQuizForm(f => ({ ...f, title: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                <textarea value={quizForm.description} onChange={e => setQuizForm(f => ({ ...f, description: e.target.value }))} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Related Module</label>
                <select value={quizForm.module_id} onChange={e => setQuizForm(f => ({ ...f, module_id: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 bg-white">
                  <option value="">None</option>
                  {dbModules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={quizForm.published} onChange={e => setQuizForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 rounded" />
                <span className="text-sm font-semibold text-slate-700">Published</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary text-sm py-2.5 px-5 disabled:opacity-60">{saving ? 'Saving…' : 'Save Quiz'}</button>
                <button type="button" onClick={() => setView('list')} className="btn-secondary text-sm py-2.5 px-5">Cancel</button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* QUESTIONS */}
      {view === 'questions' && selectedQuiz && (
        <>
          <button onClick={() => setView('list')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4 font-semibold"><ChevronLeft size={16} /> Back to Quizzes</button>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-extrabold text-slate-900">Questions: {selectedQuiz.title}</h2>
            <button onClick={() => { setQForm(emptyQ); setEditQId(null); setShowQForm(true) }} className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2"><Plus size={15} /> Add Question</button>
          </div>

          {showQForm && (
            <div className="bg-white rounded-2xl border border-blue-200 p-6 mb-5">
              <h3 className="font-bold text-slate-900 mb-4">{editQId ? 'Edit Question' : 'New Question'}</h3>
              <form onSubmit={saveQuestion} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Question Text *</label>
                  <textarea required value={qForm.question_text} onChange={e => setQForm(f => ({ ...f, question_text: e.target.value }))} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 resize-none" />
                </div>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3">
                    <input type="radio" name="correct" checked={qForm.correct_answer === i} onChange={() => setQForm(f => ({ ...f, correct_answer: i }))} className="flex-shrink-0" />
                    <label className="text-xs font-bold text-slate-500 w-6">{String.fromCharCode(65 + i)}</label>
                    <input required value={qForm.options[i]} onChange={e => { const opts = [...qForm.options]; opts[i] = e.target.value; setQForm(f => ({ ...f, options: opts })) }} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 text-sm" placeholder={`Option ${String.fromCharCode(65 + i)}`} />
                  </div>
                ))}
                <p className="text-xs text-slate-400">Select the radio button next to the correct answer.</p>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Explanation</label>
                  <textarea value={qForm.explanation} onChange={e => setQForm(f => ({ ...f, explanation: e.target.value }))} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 resize-none" placeholder="Why is this the correct answer?" />
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={saving} className="btn-primary text-sm py-2.5 px-5 disabled:opacity-60">{saving ? 'Saving…' : 'Save Question'}</button>
                  <button type="button" onClick={() => setShowQForm(false)} className="btn-secondary text-sm py-2.5 px-5">Cancel</button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-3">
            {questions.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400">No questions yet. Add the first one above.</div>
            ) : (
              questions.map((q, i) => (
                <div key={q.id} className="bg-white rounded-2xl border border-slate-100 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-semibold text-slate-900 text-sm flex-1">{i + 1}. {q.question_text}</p>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => { const opts = Array.isArray(q.options) ? q.options : JSON.parse(q.options || '["","","",""]'); setQForm({ question_text: q.question_text, options: opts, correct_answer: q.correct_answer, explanation: q.explanation || '', sort_order: q.sort_order }); setEditQId(q.id); setShowQForm(true) }} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Edit2 size={14} /></button>
                      <button onClick={() => setDeleteConfirm({ type: 'question', id: q.id })} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-1">
                    {(Array.isArray(q.options) ? q.options : JSON.parse(q.options || '[]')).map((opt, j) => (
                      <span key={j} className={`text-xs px-2 py-1 rounded-lg ${j === q.correct_answer ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-500'}`}>
                        {j === q.correct_answer ? '✓ ' : ''}{String.fromCharCode(65 + j)}: {opt}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4"><AlertTriangle size={20} className="text-red-500" /><h3 className="font-bold text-slate-900">Confirm Delete</h3></div>
            <p className="text-sm text-slate-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => deleteConfirm.type === 'quiz' ? deleteQuiz(deleteConfirm.id) : deleteQuestion(deleteConfirm.id)} className="bg-red-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-red-700">Delete</button>
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary text-sm py-2.5 px-4">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}

