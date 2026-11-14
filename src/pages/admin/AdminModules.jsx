import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import AppLayout from '../../components/layout/AppLayout'
import { Plus, Edit2, Trash2, Check, X, AlertTriangle, ChevronLeft } from 'lucide-react'

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced']
const CATEGORIES = ['Security Fundamentals', 'Scams & Fraud', 'Privacy', 'Social Media', 'Payments', 'Identity', 'Safety', 'Media Literacy']

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const emptyForm = { title: '', slug: '', description: '', category: '', difficulty: 'Beginner', estimated_minutes: 10, icon: '📚', published: false }

export default function AdminModules() {
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [msg, setMsg] = useState(null)

  useEffect(() => { fetchModules() }, [])

  async function fetchModules() {
    setLoading(true)
    const { data } = await supabase.from('learning_modules').select('*').order('created_at', { ascending: false })
    setModules(data || [])
    setLoading(false)
  }

  function openCreate() {
    setForm(emptyForm)
    setEditId(null)
    setShowForm(true)
  }

  function openEdit(mod) {
    setForm({ title: mod.title, slug: mod.slug, description: mod.description || '', category: mod.category || '', difficulty: mod.difficulty, estimated_minutes: mod.estimated_minutes, icon: mod.icon || '📚', published: mod.published })
    setEditId(mod.id)
    setShowForm(true)
  }

  async function handleSave(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.slug.trim()) return
    setSaving(true)
    setMsg(null)
    const payload = { ...form, updated_at: new Date().toISOString() }
    const { error } = editId
      ? await supabase.from('learning_modules').update(payload).eq('id', editId)
      : await supabase.from('learning_modules').insert({ ...payload, id: payload.id || payload.slug, created_at: new Date().toISOString() })
    setSaving(false)
    if (error) { setMsg({ type: 'error', text: error.message }); return }
    setMsg({ type: 'success', text: editId ? 'Module updated.' : 'Module created.' })
    setShowForm(false)
    fetchModules()
    setTimeout(() => setMsg(null), 3000)
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('learning_modules').delete().eq('id', id)
    setDeleteConfirm(null)
    if (error) { setMsg({ type: 'error', text: error.message }); return }
    setMsg({ type: 'success', text: 'Module deleted.' })
    fetchModules()
    setTimeout(() => setMsg(null), 3000)
  }

  async function togglePublished(mod) {
    await supabase.from('learning_modules').update({ published: !mod.published, updated_at: new Date().toISOString() }).eq('id', mod.id)
    fetchModules()
  }

  return (
    <AppLayout>
      {!showForm ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Learning Modules</h2>
              <p className="text-slate-500 text-sm">Create, edit, and publish modules.</p>
            </div>
            <button onClick={openCreate} className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2">
              <Plus size={15} /> New Module
            </button>
          </div>

          {msg && (
            <div className={`mb-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm ${msg.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
              {msg.type === 'success' ? <Check size={15} /> : <X size={15} />} {msg.text}
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {loading ? (
              <div className="p-6 space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-12 shimmer rounded-lg" />)}</div>
            ) : modules.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-400 mb-2">No modules yet.</p>
                <p className="text-xs text-slate-400 mb-4">Run <code className="bg-slate-100 px-1.5 py-0.5 rounded">supabase/seed.sql</code> to seed initial modules.</p>
                <button onClick={openCreate} className="btn-primary text-sm py-2.5 px-5">Create First Module</button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      {['Title', 'Slug', 'Difficulty', 'Published', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map(mod => (
                      <tr key={mod.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-slate-900">{mod.icon} {mod.title}</td>
                        <td className="px-4 py-3 text-slate-500 font-mono text-xs">{mod.slug}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{mod.difficulty}</span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => togglePublished(mod)}
                            className={`w-10 h-5 rounded-full transition-colors relative ${mod.published ? 'bg-emerald-500' : 'bg-slate-300'}`}
                            aria-label={mod.published ? 'Unpublish' : 'Publish'}
                          >
                            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${mod.published ? 'left-5' : 'left-0.5'}`} />
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => openEdit(mod)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600">
                              <Edit2 size={14} />
                            </button>
                            <button onClick={() => setDeleteConfirm(mod.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                              <Trash2 size={14} />
                            </button>
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
      ) : (
        <>
          <button onClick={() => setShowForm(false)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6 font-semibold">
            <ChevronLeft size={16} /> Back to Modules
          </button>
          <div className="bg-white rounded-2xl border border-slate-100 p-6 max-w-2xl">
            <h2 className="text-xl font-extrabold text-slate-900 mb-5">{editId ? 'Edit Module' : 'Create Module'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Icon (emoji)</label>
                  <input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900" placeholder="📚" maxLength={2} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Difficulty</label>
                  <select value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 bg-white">
                    {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title *</label>
                <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: editId ? f.slug : slugify(e.target.value) }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900" placeholder="Module title" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Slug *</label>
                <input required value={form.slug} onChange={e => setForm(f => ({ ...f, slug: slugify(e.target.value) }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 font-mono text-sm" placeholder="module-slug" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 resize-none" placeholder="Short description" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 bg-white">
                    <option value="">Select…</option>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Est. Minutes</label>
                  <input type="number" min="1" max="120" value={form.estimated_minutes} onChange={e => setForm(f => ({ ...f, estimated_minutes: parseInt(e.target.value) || 10 }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900" />
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 rounded" />
                <span className="text-sm font-semibold text-slate-700">Published (visible to users)</span>
              </label>

              {msg && (
                <div className={`flex items-center gap-2 text-sm px-4 py-3 rounded-xl ${msg.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                  {msg.type === 'success' ? <Check size={15} /> : <X size={15} />} {msg.text}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary text-sm py-2.5 px-5 disabled:opacity-60">
                  {saving ? 'Saving…' : editId ? 'Update Module' : 'Create Module'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm py-2.5 px-5">Cancel</button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={20} className="text-red-500" />
              <h3 className="font-bold text-slate-900">Delete Module?</h3>
            </div>
            <p className="text-sm text-slate-500 mb-5">This will permanently delete the module and all associated lesson progress. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteConfirm)} className="bg-red-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-red-700 transition-colors">Delete</button>
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary text-sm py-2.5 px-4">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}

