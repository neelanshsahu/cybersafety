import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const resources = [
  {
    id: 'guide-phishing',
    type: 'Guide',
    typeColor: 'bg-blue-100 text-blue-700',
    icon: '🎣',
    title: 'How to Identify Phishing Messages',
    duration: '5 min read',
    desc: 'Step-by-step guide to spotting fake messages, fraudulent emails and scam links.',
  },
  {
    id: 'checklist-passwords',
    type: 'Checklist',
    typeColor: 'bg-emerald-100 text-emerald-700',
    icon: '✅',
    title: 'Password Security Checklist',
    duration: '2 min',
    desc: 'A printable checklist to audit your current passwords and improve your security immediately.',
  },
  {
    id: 'video-upi',
    type: 'Video',
    typeColor: 'bg-red-100 text-red-700',
    icon: '▶️',
    title: 'UPI Scam Awareness — Real Examples',
    duration: '8 min watch',
    desc: 'See how UPI collect scams and fake payment requests work — and how to avoid them.',
  },
  {
    id: 'guide-privacy',
    type: 'Guide',
    typeColor: 'bg-blue-100 text-blue-700',
    icon: '🔒',
    title: 'Social Media Privacy Settings',
    duration: '6 min read',
    desc: 'Platform-by-platform guide to locking down your privacy on Facebook, Instagram and WhatsApp.',
  },
  {
    id: 'faq-cyber',
    type: 'FAQ',
    typeColor: 'bg-purple-100 text-purple-700',
    icon: '❓',
    title: 'Cybersecurity FAQs for Beginners',
    duration: '4 min read',
    desc: 'The most common questions about staying safe online — answered in plain language.',
  },
  {
    id: 'checklist-family',
    type: 'Checklist',
    typeColor: 'bg-emerald-100 text-emerald-700',
    icon: '👨‍👩‍👧',
    title: 'Family Online Safety Checklist',
    duration: '3 min',
    desc: 'Essential steps every family should take to stay safe together in the digital world.',
  },
]

export default function ResourcesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="resources"
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}
      aria-label="Resource library"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16" ref={ref}>
          <motion.p
            className="section-label mb-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Resource Library
          </motion.p>
          <motion.h2
            className="section-heading mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Everything you need to{' '}
            <span className="gradient-text">stay safer online.</span>
          </motion.h2>
          <motion.p
            className="section-subheading mx-auto text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Guides, checklists, videos, and FAQs — all free and created for people who are not security experts.
          </motion.p>
        </div>

        {/* Resource type filters */}
        <motion.div
          className="flex gap-2 flex-wrap justify-center mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {['All', 'Guide', 'Checklist', 'Video', 'FAQ'].map(tag => (
            <button
              key={tag}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                tag === 'All'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
              }`}
              aria-label={`Filter by ${tag}`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Resources grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res, i) => (
            <motion.article
              key={res.id}
              className="resource-card flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Type tag */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${res.typeColor}`}>
                  {res.type}
                </span>
                <span className="text-xs text-slate-400 font-medium">{res.duration}</span>
              </div>

              {/* Icon + title */}
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl flex-shrink-0">{res.icon}</span>
                <h3 className="font-bold text-slate-900 text-base leading-snug">{res.title}</h3>
              </div>

              {/* Description */}
              <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">{res.desc}</p>

              {/* Read link */}
              <Link
                to="/signup"
                className="inline-flex items-center gap-1 text-blue-600 text-sm font-bold hover:text-blue-700 transition-colors"
                aria-label={`Read: ${res.title}`}
              >
                Read {res.type} →
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View all */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <Link to="/signup" className="btn-secondary inline-flex">
            View All Resources →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
