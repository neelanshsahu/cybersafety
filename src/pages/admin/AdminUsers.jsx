import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import AppLayout from '../../components/layout/AppLayout'
import { Search, Users, AlertTriangle, Check, X, ChevronLeft } from 'lucide-react'

const PAGE_SIZE = 20

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [roleConfirm, setRoleConfirm] = useState(null) // { user, newRole }
  const [msg, setMsg] = useState(null)
  const [expanded, setExpanded] = useState(null)

  const CATEGORIES = ['', 'Student', 'Parent', 'Teacher', 'Senior Citizen', 'General Internet User', 'Other']

  useEffect(() => { fetchUsers() }, [page, search, categoryFilter])

  async function fetchUsers() {
    setLoading(true)
    let q = supabase.from('profiles').select('*', { count: 'exact' }).range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1).order('created_at', { ascending: false })
    if (search) q = q.ilike('full_name', `%${search}%`)
    if (categoryFilter) q = q.eq('user_category', categoryFilter)
    const { data, count } = await q
    setUsers(data || [])
    setTotal(count || 0)
    setLoading(false)
  }

  async function changeRole(userId, newRole) {
    const { error } = await supabase.from('profiles').update({ role: newRole, updated_at: new Date().toISOString() }).eq('id', userId)
    setRoleConfirm(null)
    if (error) { setMsg({ type: 'error', text: error.message }); return }
    setMsg({ type: 'success', text: `Role updated to ${newRole}.` })
    fetchUsers()
    setTimeout(() => setMsg(null), 3000)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <AppLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">User Management</h2>
        <p className="text-slate-500 text-sm">{total} registered users · Read-only view. To delete accounts, use the Supabase Dashboard.</p>
      </div>

      {msg && (
        <div className={`mb-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm ${msg.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
          {msg.type === 'success' ? <Check size={15} /> : <X size={15} />} {msg.text}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search by name…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0) }}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={e => { setCategoryFilter(e.target.value); setPage(0) }}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-white text-slate-700"
        >
          <option value="">All Categories</option>
          {CATEGORIES.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">{[...Array(8)].map((_, i) => <div key={i} className="h-10 shimmer rounded-lg" />)}</div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-slate-400">No users found.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['Name', 'Category', 'Role', 'Joined', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {(u.full_name || 'U')[0].toUpperCase()}
                          </div>
                          <span className="font-semibold text-slate-900">{u.full_name || 'Unnamed'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{u.user_category || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                          {u.role || 'user'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{new Date(u.created_at).toLocaleDateString('en-IN')}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setRoleConfirm({ user: u, newRole: u.role === 'admin' ? 'user' : 'admin' })}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${u.role === 'admin'
                              ? 'text-amber-700 hover:bg-amber-50'
                              : 'text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                          {u.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-sm">
                <span className="text-slate-500">Page {page + 1} of {totalPages}</span>
                <div className="flex gap-2">
                  <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="btn-secondary text-xs py-1.5 px-3 disabled:opacity-40">← Prev</button>
                  <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className="btn-secondary text-xs py-1.5 px-3 disabled:opacity-40">Next →</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <strong>Note:</strong> To delete a user account permanently, use the Supabase Dashboard → Authentication → Users. Account deletion requires the service role key, which is not and should not be present in the frontend.
      </div>

      {/* Role change confirmation */}
      {roleConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setRoleConfirm(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-3"><AlertTriangle size={20} className="text-amber-500" /><h3 className="font-bold text-slate-900">Change Role</h3></div>
            <p className="text-sm text-slate-600 mb-5">
              Set <strong>{roleConfirm.user.full_name || roleConfirm.user.id}</strong> as <strong className="text-amber-700">{roleConfirm.newRole}</strong>?
              {roleConfirm.newRole === 'admin' && ' This will give them full admin access to this panel.'}
            </p>
            <div className="flex gap-3">
              <button onClick={() => changeRole(roleConfirm.user.id, roleConfirm.newRole)} className="bg-amber-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-amber-700">Confirm</button>
              <button onClick={() => setRoleConfirm(null)} className="btn-secondary text-sm py-2.5 px-4">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}

