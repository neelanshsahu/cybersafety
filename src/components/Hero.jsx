import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// Animated Dashboard Mockup
function DashboardMockup() {
  const [progress, setProgress] = useState(0)
  const [notifVisible, setNotifVisible] = useState(false)
  const [activeCard, setActiveCard] = useState(null)
  const hasAnimated = useRef(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true
      // Animate progress bar
      let p = 0
      const timer = setInterval(() => {
        p += 2
        if (p > 78) { p = 78; clearInterval(timer) }
        setProgress(p)
      }, 30)
      // Show notification after delay
      setTimeout(() => setNotifVisible(true), 1800)
      // Cycle card highlight
      setTimeout(() => setActiveCard(0), 800)
      setTimeout(() => setActiveCard(1), 1400)
      setTimeout(() => setActiveCard(2), 2000)
      return () => clearInterval(timer)
    }
  }, [inView])

  const modules = [
    { icon: '🔐', label: 'Password', color: 'bg-blue-50 border-blue-200' },
    { icon: '🎣', label: 'Phishing', color: 'bg-amber-50 border-amber-200' },
    { icon: '📱', label: 'Privacy', color: 'bg-emerald-50 border-emerald-200' },
  ]

  return (
    <div ref={ref} className="relative">
      {/* Floating decoration blobs */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-60 float-gentle" aria-hidden="true" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-emerald-100 rounded-full blur-2xl opacity-60 float-delayed" aria-hidden="true" />

      {/* Dashboard window */}
      <motion.div
        className="relative bg-white rounded-2xl dashboard-shadow overflow-hidden border border-slate-100 w-full max-w-sm mx-auto"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        {/* Window chrome */}
        <div className="bg-slate-50 px-4 py-3 flex items-center gap-2 border-b border-slate-100">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-4 h-4 text-blue-600">🛡️</div>
            <span className="text-xs font-bold text-slate-700">CyberSafe</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="text-slate-400 text-xs font-medium mb-0.5">Good evening 👋</p>
            <p className="text-slate-900 font-bold text-base">Your safety journey</p>
          </motion.div>

          {/* Progress */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-semibold text-slate-600">Overall Progress</span>
              <span className="text-xs font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>

          {/* Continue label */}
          <motion.p
            className="text-xs font-semibold text-slate-500 mt-4 mb-2.5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            Continue Learning
          </motion.p>

          {/* Module cards */}
          <div className="grid grid-cols-3 gap-2">
            {modules.map((m, i) => (
              <motion.div
                key={m.label}
                className={`rounded-xl border p-2.5 flex flex-col items-center gap-1 cursor-pointer transition-all duration-200 ${m.color} ${activeCard === i ? 'ring-2 ring-blue-400 ring-offset-1 scale-105' : ''}`}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
              >
                <span className="text-lg">{m.icon}</span>
                <span className="text-xs font-semibold text-slate-700">{m.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <motion.div
            className="mt-4 grid grid-cols-3 gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.4 }}
          >
            {[
              { n: '8', label: 'Lessons' },
              { n: '4', label: 'Badges' },
              { n: '92%', label: 'Score' },
            ].map(s => (
              <div key={s.label} className="bg-slate-50 rounded-lg py-2 text-center">
                <div className="text-sm font-bold text-slate-900">{s.n}</div>
                <div className="text-xs text-slate-400 font-medium">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Notification toast */}
        <AnimatedNotif visible={notifVisible} />
      </motion.div>
    </div>
  )
}

function AnimatedNotif({ visible }) {
  return (
    <motion.div
      className="absolute top-4 right-4 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg"
      initial={{ opacity: 0, x: 30, scale: 0.9 }}
      animate={visible ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 30, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-emerald-500 text-sm">✓</span>
      <span className="text-xs font-semibold text-emerald-700">Lesson Complete!</span>
    </motion.div>
  )
}



export default function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.08) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-bold text-blue-700 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Free Digital Literacy Platform
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Cyber Safety.{' '}
              <span className="gradient-text">For Everyone.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="text-base sm:text-lg text-slate-500 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Learn how to recognize online threats, protect your personal information, and use the digital world with confidence.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link to="/signup" id="hero-start-learning" className="btn-primary text-base py-3.5 px-7">
                Start Learning →
              </Link>
              <a
                href="#solution"
                onClick={e => {
                  e.preventDefault()
                  document.querySelector('#solution')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-secondary text-base py-3.5 px-7"
                id="hero-see-how"
              >
                See How It Works ↓
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="mt-10 flex items-center gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="flex -space-x-2">
                {['👩', '👨', '👴', '🧑'].map((e, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-sm"
                  >
                    {e}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">25,000+ learners</p>
                <p className="text-xs text-slate-400">across communities</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Dashboard */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <DashboardMockup />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="text-xs text-slate-400 font-medium">Scroll to explore</span>
          <motion.div
            className="w-5 h-8 border-2 border-slate-300 rounded-full flex justify-center pt-1.5"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-1 h-1.5 bg-slate-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
