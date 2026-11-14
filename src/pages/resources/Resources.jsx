import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import { Search, FileText, BookOpen, CheckSquare, ExternalLink, X, ChevronRight } from 'lucide-react'

const resourcesData = [
  { id: 1, title: 'Complete Guide to Password Security', type: 'guide', category: 'Security', readTime: '8 min', description: 'Everything you need to know about creating strong passwords, using password managers, and enabling two-factor authentication.', relatedSlug: 'password-security' },
  { id: 2, title: 'Digital Safety Checklist for Families', type: 'checklist', category: 'Family Safety', readTime: '5 min', description: 'A printable checklist to help your entire family stay safe online — covers social media, payments, passwords, and devices.', relatedSlug: 'social-media-safety' },
  { id: 3, title: 'UPI & Digital Payment Safety Guide', type: 'guide', category: 'Payments', readTime: '10 min', description: 'How to safely use UPI apps, avoid payment scams, recognise fake collect requests, and protect your mobile banking.', relatedSlug: 'digital-payments' },
  { id: 4, title: 'How to Recognise Phishing Emails and SMSes', type: 'article', category: 'Scams', readTime: '6 min', description: 'A visual guide to identifying fake communications from banks, delivery services, and government portals.', relatedSlug: 'phishing-scams' },
  { id: 5, title: 'Privacy Settings Guide: Android & iPhone', type: 'guide', category: 'Privacy', readTime: '12 min', description: 'Step-by-step instructions for configuring privacy settings on the most popular smartphones used in India.', relatedSlug: 'online-privacy' },
  { id: 6, title: 'Cyberbullying: A Guide for Parents & Students', type: 'guide', category: 'Safety', readTime: '9 min', description: 'Understanding, preventing, and responding to cyberbullying — with India-specific resources and helplines.', relatedSlug: 'cyberbullying' },
  { id: 7, title: 'Safe Social Media Checklist', type: 'checklist', category: 'Social Media', readTime: '4 min', description: 'A step-by-step checklist to review your social media privacy settings across Instagram, Facebook, WhatsApp, and LinkedIn.', relatedSlug: 'social-media-safety' },
  { id: 8, title: 'Misinformation & Fake News: How to Spot It', type: 'article', category: 'Media Literacy', readTime: '7 min', description: 'Tips for verifying news before sharing on WhatsApp, with links to Indian fact-checking organisations.', relatedSlug: 'misinformation' },
  { id: 9, title: 'Identity Theft: What to Do If It Happens', type: 'guide', category: 'Identity', readTime: '11 min', description: 'A practical step-by-step action plan if your Aadhaar, PAN, or personal information has been compromised.', relatedSlug: 'identity-protection' },
  { id: 10, title: "Senior Citizens' Guide to Online Safety", type: 'guide', category: 'Senior Safety', readTime: '15 min', description: 'Specially designed for senior citizens — covers UPI scams, OTP fraud, phone impersonation, and safe internet banking.', relatedSlug: 'digital-payments' },
  { id: 11, title: 'OTP Security: Why You Must Never Share It', type: 'article', category: 'Payments', readTime: '5 min', description: 'Understanding why OTPs are secret and the common tactics scammers use to steal them from you.', relatedSlug: 'digital-payments' },
  { id: 12, title: 'Two-Factor Authentication Setup Guide', type: 'guide', category: 'Security', readTime: '8 min', description: 'How to enable 2FA on WhatsApp, Gmail, banking apps, and social media — and why it is essential.', relatedSlug: 'password-security' },
  { id: 13, title: 'Aadhaar Safety: Protecting Your Identity', type: 'article', category: 'Identity', readTime: '6 min', description: 'How to use masked Aadhaar, virtual IDs, and lock your biometrics to protect India\'s most important identity document.', relatedSlug: 'identity-protection' },
  { id: 14, title: 'Smartphone Security Checklist', type: 'checklist', category: 'Security', readTime: '5 min', description: 'Essential settings to enable on your Android or iPhone today — screen lock, updates, Find My Device, and more.', relatedSlug: 'smartphone-security' },
  { id: 15, title: "What to Do After a Cyber Attack: FAQs", type: 'faq', category: 'Emergency', readTime: '10 min', description: 'Frequently asked questions and answers for people who have experienced phishing, fraud, hacking, or identity theft.', relatedSlug: null },
]

const TYPE_ICONS = { guide: BookOpen, article: FileText, checklist: CheckSquare, faq: FileText }
const TYPE_COLORS = {
  guide: 'bg-blue-100 text-blue-700',
  article: 'bg-purple-100 text-purple-700',
  checklist: 'bg-emerald-100 text-emerald-700',
  faq: 'bg-amber-100 text-amber-700',
}
const CATEGORIES = ['All', ...Array.from(new Set(resourcesData.map(r => r.category)))]
const TYPES = ['All', 'guide', 'article', 'checklist', 'faq']

export default function Resources() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [type, setType] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = resourcesData.filter(r => {
    const q = search.toLowerCase()
    const matchSearch = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
    const matchCat = category === 'All' || r.category === category
    const matchType = type === 'All' || r.type === type
    return matchSearch && matchCat && matchType
  })

  return (
    <AppLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Resources</h2>
        <p className="text-slate-500">Guides, checklists, and articles to help you stay safe online.</p>
      </div>

      {/* Search & filters */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6 space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search resources…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {TYPES.map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize transition-all ${type === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                }`}
            >
              {t === 'All' ? 'All Types' : t}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${category === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-400 mb-4">{filtered.length} resource{filtered.length !== 1 ? 's' : ''}</p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-400 mb-3">No resources match your filters.</p>
          <button onClick={() => { setSearch(''); setCategory('All'); setType('All') }} className="text-blue-600 text-sm font-semibold">Clear filters</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(r => {
            const Icon = TYPE_ICONS[r.type] || FileText
            return (
              <button
                key={r.id}
                onClick={() => setSelected(r)}
                className="bg-white rounded-2xl border border-slate-100 p-5 card-hover text-left flex flex-col hover:border-blue-200 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <Icon size={18} className="text-slate-500" />
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${TYPE_COLORS[r.type] || 'bg-slate-100 text-slate-600'}`}>
                    {r.type}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex-1">{r.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{r.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{r.readTime} read</span>
                  <span className="text-blue-600 font-semibold flex items-center gap-1">Read <ChevronRight size={12} /></span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Resource modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <span className={`text-xs font-bold px-2 py-1 rounded-full capitalize ${TYPE_COLORS[selected.type] || 'bg-slate-100 text-slate-600'}`}>
                  {selected.type}
                </span>
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
                  <X size={16} />
                </button>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 mb-3">{selected.title}</h2>
              <p className="text-slate-500 leading-relaxed mb-5">{selected.description}</p>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm text-slate-600 mb-5">
                <p className="font-semibold text-slate-800 mb-1">About this resource</p>
                <p>Estimated reading time: <strong>{selected.readTime}</strong></p>
                <p>Category: <strong>{selected.category}</strong></p>
              </div>

              {selected.relatedSlug && (
                <Link
                  to={`/learn/${selected.relatedSlug}`}
                  className="btn-primary w-full justify-center mb-3"
                  onClick={() => setSelected(null)}
                >
                  Go to Related Module <ChevronRight size={16} />
                </Link>
              )}

              <p className="text-xs text-slate-400 text-center">
                Full content is available in the related learning module above. External resources open in a new tab.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <strong>Note:</strong> These resources are for educational purposes. Always verify information with official sources.
        For cyber crime reporting, visit{' '}
        <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">cybercrime.gov.in</a>.
      </div>
    </AppLayout>
  )
}

