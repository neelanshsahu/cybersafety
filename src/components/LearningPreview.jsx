import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const modules = [
  {
    id: 'password',
    slug: 'password-security',
    icon: '🔐',
    title: 'Password Security',
    tag: 'Beginner',
    tagColor: 'bg-emerald-100 text-emerald-700',
    duration: '8 min',
    desc: 'Strong passwords are your first line of defense. Learn why it matters and how attackers exploit weak ones.',
    checklist: [
      'Create strong, memorable passwords',
      'Use unique passwords for every account',
      'Enable two-factor authentication (2FA)',
      'Use a password manager safely',
    ],
  },
  {
    id: 'phishing',
    slug: 'phishing-scams',
    icon: '🎣',
    title: 'Phishing & Scams',
    tag: 'Essential',
    tagColor: 'bg-red-100 text-red-700',
    duration: '12 min',
    desc: 'Recognize the tricks used by scammers to steal your information through fake messages and websites.',
    checklist: [
      'Identify suspicious sender addresses',
      'Spot fake urgency and pressure tactics',
      'Verify links before clicking',
      'Report phishing attempts correctly',
    ],
  },
  {
    id: 'social',
    slug: 'social-media-safety',
    icon: '📲',
    title: 'Social Media Safety',
    tag: 'Intermediate',
    tagColor: 'bg-blue-100 text-blue-700',
    duration: '10 min',
    desc: 'Control what you share, who can see it, and how to stay safe across social platforms.',
    checklist: [
      'Configure privacy settings properly',
      'Recognize social engineering attacks',
      'Avoid oversharing personal information',
      'Handle online harassment safely',
    ],
  },
  {
    id: 'privacy',
    slug: 'online-privacy',
    icon: '🔒',
    title: 'Online Privacy',
    tag: 'Intermediate',
    tagColor: 'bg-purple-100 text-purple-700',
    duration: '9 min',
    desc: 'Understand how your data is collected, used, and how to protect it effectively.',
    checklist: [
      'Manage app permissions on your phone',
      'Use private/incognito browsing wisely',
      'Read privacy policies effectively',
      'Opt out of unnecessary data collection',
    ],
  },
  {
    id: 'cyberbullying',
    slug: 'cyberbullying',
    icon: '🤝',
    title: 'Cyberbullying',
    tag: 'Essential',
    tagColor: 'bg-amber-100 text-amber-700',
    duration: '7 min',
    desc: 'Understand, recognize, and respond to cyberbullying — whether you\'re a victim, bystander, or parent.',
    checklist: [
      'Identify different forms of cyberbullying',
      'Document and report incidents effectively',
      'Support affected friends and family',
      'Understand your legal rights online',
    ],
  },
  {
    id: 'payments',
    slug: 'digital-payments',
    icon: '💳',
    title: 'Digital Payment Safety',
    tag: 'Essential',
    tagColor: 'bg-emerald-100 text-emerald-700',
    duration: '11 min',
    desc: 'Stay safe when using UPI, net banking, and digital wallets. Protect yourself from payment fraud.',
    checklist: [
      'Never share OTP with anyone',
      'Verify payment requests before approving',
      'Beware of fake QR code payment requests',
      'Know what to do if you suspect fraud (helpline 1930)',
    ],
  },
  {
    id: 'browsing',
    slug: 'safe-browsing',
    icon: '🌐',
    title: 'Safe Browsing',
    tag: 'Beginner',
    tagColor: 'bg-blue-100 text-blue-700',
    duration: '6 min',
    desc: 'Browse the web safely by identifying secure sites, avoiding malicious downloads, and using safe search habits.',
    checklist: [
      'Identify HTTPS and secure connections',
      'Avoid suspicious downloads and pop-ups',
      'Use reputable search engines safely',
      'Understand browser security settings',
    ],
  },
  {
    id: 'identity',
    slug: 'identity-protection',
    icon: '🪪',
    title: 'Identity Protection',
    tag: 'Advanced',
    tagColor: 'bg-slate-100 text-slate-700',
    duration: '14 min',
    desc: 'Protect your digital identity from theft and learn how to recover if your information is compromised.',
    checklist: [
      'Monitor your digital footprint',
      'Set up identity theft alerts',
      'Recognize signs of identity theft',
      'Steps to take if you are compromised',
    ],
  },
]

function ModuleCard({ mod, index, isExpanded, onToggle, inView }) {
  return (
    <motion.div
      className={`rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden ${
        isExpanded
          ? 'border-blue-200 bg-blue-50/50 shadow-lg'
          : 'border-slate-100 bg-white hover:border-blue-100 hover:shadow-md'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onToggle}
      role="button"
      aria-expanded={isExpanded}
      aria-controls={`module-content-${mod.id}`}
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onToggle()}
    >
      {/* Card header */}
      <div className="p-4 flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${isExpanded ? 'bg-blue-100' : 'bg-slate-100'}`}>
          {mod.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-slate-900 text-sm">{mod.title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${mod.tagColor}`}>{mod.tag}</span>
          </div>
        </div>
        <motion.div
          className="text-slate-400 text-sm flex-shrink-0"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ↓
        </motion.div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`module-content-${mod.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-blue-100 pt-3">
              <p className="text-sm text-slate-600 leading-relaxed mb-3">{mod.desc}</p>
              <ul className="space-y-1.5 mb-4">
                {mod.checklist.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-2 text-sm text-slate-700"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <span className="text-emerald-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <Link
                to={`/learn/${mod.slug || mod.id}`}
                className="btn-primary text-xs py-2.5 px-5 inline-block no-underline"
                aria-label={`Start ${mod.title} lesson`}
              >
                Start Lesson →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function LearningPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [expanded, setExpanded] = useState('phishing')

  const leftModules = modules.filter((_, i) => i % 2 === 0)
  const rightModules = modules.filter((_, i) => i % 2 === 1)

  return (
    <section
      id="learning"
      className="relative py-32 bg-white overflow-hidden"
      aria-label="Learning modules"
    >
      {/* Background */}
      <div
        className="absolute left-0 top-0 w-1/2 h-full opacity-40"
        style={{ background: 'radial-gradient(ellipse at left center, rgba(37,99,235,0.05) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16" ref={ref}>
          <motion.p
            className="section-label mb-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            The Curriculum
          </motion.p>
          <motion.h2
            className="section-heading mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Learn what actually matters.
          </motion.h2>
          <motion.p
            className="section-subheading mx-auto text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Eight practical modules covering the most important aspects of cyber safety — designed for real people, not security experts.
          </motion.p>
        </div>

        {/* Module grid with independent left & right columns */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {leftModules.map((mod, i) => (
              <ModuleCard
                key={mod.id}
                mod={mod}
                index={i * 2}
                isExpanded={expanded === mod.id}
                onToggle={() => setExpanded(expanded === mod.id ? null : mod.id)}
                inView={inView}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {rightModules.map((mod, i) => (
              <ModuleCard
                key={mod.id}
                mod={mod}
                index={i * 2 + 1}
                isExpanded={expanded === mod.id}
                onToggle={() => setExpanded(expanded === mod.id ? null : mod.id)}
                inView={inView}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-slate-500 text-sm mb-4">All modules are free and self-paced</p>
          <a href="/signup" className="btn-primary inline-flex">
            Start Your Journey →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
