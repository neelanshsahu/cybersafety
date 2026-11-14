import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

// Animated shield SVG
function ShieldBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,0.07) 0%, transparent 70%)',
        }}
      />
      {/* Floating shield icons */}
      {[
        { top: '10%', left: '8%', size: 40, delay: 0 },
        { top: '20%', right: '10%', size: 28, delay: 1 },
        { bottom: '15%', left: '12%', size: 32, delay: 2 },
        { bottom: '25%', right: '8%', size: 24, delay: 0.5 },
        { top: '55%', left: '4%', size: 20, delay: 1.5 },
        { top: '40%', right: '5%', size: 36, delay: 2.5 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute text-blue-200/40 select-none"
          style={{ top: pos.top, left: pos.left, right: pos.right, bottom: pos.bottom, fontSize: pos.size }}
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: pos.delay, ease: 'easeInOut' }}
        >
          🛡️
        </motion.div>
      ))}
    </div>
  )
}

export default function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="cta"
      className="relative py-40 overflow-hidden bg-slate-50"
      aria-label="Get started with CyberSafe"
    >
      <ShieldBackground />

      <div className="relative max-w-4xl mx-auto px-6 text-center" ref={ref}>
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-bold text-blue-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Free — No credit card required
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Your digital safety journey{' '}
          <span className="gradient-text">starts here.</span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          className="text-xl text-slate-500 leading-relaxed mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          Learn the risks. Build safer habits. Help create a more digitally aware community.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <Link
            to="/signup"
            id="final-cta-signup"
            className="btn-primary text-base py-4 px-8 text-lg"
            style={{ boxShadow: '0 8px 32px rgba(37,99,235,0.3)' }}
          >
            Create Free Account →
          </Link>
          <Link
            to="/signin"
            id="final-cta-signin"
            className="btn-secondary text-base py-4 px-8 text-base"
          >
            Sign In
          </Link>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          className="flex flex-wrap gap-6 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {[
            { icon: '🆓', text: 'Always free' },
            { icon: '🔒', text: 'No personal data sold' },
            { icon: '📱', text: 'Works on any device' },
            { icon: '🌐', text: 'Available in multiple languages' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
