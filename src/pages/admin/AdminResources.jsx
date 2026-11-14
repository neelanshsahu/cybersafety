import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import AppLayout from '../../components/layout/AppLayout'
import { Plus, Edit2, Trash2, Check, X, AlertTriangle, ChevronLeft } from 'lucide-react'

const TYPES = ['article', 'guide', 'checklist', 'video', 'faq']
const CATEGORIES = ['Security', 'Payments', 'Privacy', 'Social Media', 'Identity', 'Safety', 'Family Safety', 'Senior Safety', 'Media Literacy', 'Emergency']
const emptyForm = { title: '', slug: '', description: '', resource_type: 'article', category: '', content: '', external_url: '', published: false }

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function AdminResources() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [msg, setMsg] = useState(null)

  useEffect(() => { fetchResources() }, [])

  async function fetchResources() {
    setLoading(true)
    const { data } = await supabase.from('resources').select('*').order('created_at', { ascending: false })
    setResources(data || [])
    setLoading(false)
  }

  function openCreate() { setForm(emptyForm); setEditId(null); setShowForm(true) }
  function openEdit(r) {
    setForm({ title: r.title, slug: r.slug || '', description: r.description || '', resource_type: r.resource_type, category: r.category || '', content: r.content || '', external_url: r.external_url || '', published: r.published })
    setEditId(r.id)
    setShowForm(true)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setMsg(null)
    const payload = { ...form, updated_at: new Date().toISOString() }
    const { error } = editId
      ? await supabase.from('resources').update(payload).eq('id', editId)
      : await supabase.from('resources').insert({ ...payload, created_at: new Date().toISOString() })
    setSaving(false)
    if (error) { setMsg({ type: 'error', text: error.message }); return }
    setMsg({ type: 'success', text: editId ? 'Resource updated.' : 'Resource created.' })
    setShowForm(false)
    fetchResources()
    setTimeout(() => setMsg(null), 3000)
  }

  async function handleDelete(id) {
    await supabase.from('resources').delete().eq('id', id)
    setDeleteConfirm(null)
    fetchResources()
  }

  async function togglePublished(r) {
    await supabase.from('resources').update({ published: !r.published, updated_at: new Date().toISOString() }).eq('id', r.id)
    fetchResources()
  }

  return (
    <AppLayout>
      {msg && (
        <div className={`mb-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm ${msg.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
          {msg.type === 'success' ? <Check size={15} /> : <X size={15} />} {msg.text}
        </div>
      )}

      {!showForm ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Resources</h2>
              <p className="text-slate-500 text-sm">Manage educational resources and articles.</p>
            </div>
            <button onClick={openCreate} className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2"><Plus size={15} /> New Resource</button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {loading ? (
              <div className="p-6 space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-12 shimmer rounded-lg" />)}</div>
            ) : resources.length === 0 ? (
              <div className="text-center py-16 text-slate-400">No resources yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      {['Title', 'Type', 'Category', 'Published', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map(r => (
                      <tr key={r.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                        <td className="px-4 py-3 font-semibold text-slate-900">{r.title}</td>
                        <td className="px-4 py-3"><span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full capitalize">{r.resource_type}</span></td>
                        <td className="px-4 py-3 text-slate-500 text-xs">{r.category || '—'}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => togglePublished(r)} className={`w-10 h-5 rounded-full transition-colors relative ${r.published ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${r.published ? 'left-5' : 'left-0.5'}`} />
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => openEdit(r)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Edit2 size={14} /></button>
                            <button onClick={() => setDeleteConfirm(r.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
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
          <button onClick={() => setShowForm(false)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6 font-semibold"><ChevronLeft size={16} /> Back</button>
          <div className="bg-white rounded-2xl border border-slate-100 p-6 max-w-2xl">
            <h2 className="text-xl font-extrabold text-slate-900 mb-5">{editId ? 'Edit Resource' : 'Create Resource'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title *</label>
                <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: editId ? f.slug : slugify(e.target.value) }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Type</label>
                  <select value={form.resource_type} onChange={e => setForm(f => ({ ...f, resource_type: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 bg-white">
                    {TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 bg-white">
                    <option value="">Select…</option>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Content (optional)</label>
                <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900 resize-none font-mono text-xs" placeholder="Full content text…" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">External URL (optional)</label>
                <input type="url" value={form.external_url} onChange={e => setForm(f => ({ ...f, external_url: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-900" placeholder="https://…" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 rounded" />
                <span className="text-sm font-semibold text-slate-700">Published</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary text-sm py-2.5 px-5 disabled:opacity-60">{saving ? 'Saving…' : 'Save Resource'}</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm py-2.5 px-5">Cancel</button>
              </div>
            </form>
          </div>
        </>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4"><AlertTriangle size={20} className="text-red-500" /><h3 className="font-bold text-slate-900">Delete Resource?</h3></div>
            <p className="text-sm text-slate-500 mb-5">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteConfirm)} className="bg-red-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-red-700">Delete</button>
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary text-sm py-2.5 px-4">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}

