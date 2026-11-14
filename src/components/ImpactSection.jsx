import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/*
  IMPORTANT: The statistics below are PLACEHOLDER/DEMO values.
  Replace these with real, verified data before publishing.
  These numbers do NOT represent actual organizational achievements.
*/
const stats = [
  {
    number: '25K+',
    label: 'People Reached',
    icon: '👥',
    note: '[placeholder]',
  },
  {
    number: '120+',
    label: 'Awareness Sessions',
    icon: '🎤',
    note: '[placeholder]',
  },
  {
    number: '35+',
    label: 'Communities',
    icon: '🏘️',
    note: '[placeholder]',
  },
  {
    number: '80+',
    label: 'Educational Programs',
    icon: '📚',
    note: '[placeholder]',
  },
]

function Counter({ target, inView }) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!inView || hasRun.current) return
    hasRun.current = true
    const num = parseInt(target.replace(/\D/g, ''))
    const suffix = target.replace(/[0-9]/g, '')
    const step = Math.ceil(num / 40)
    let current = 0
    const interval = setInterval(() => {
      current = Math.min(current + step, num)
      setCount(current)
      if (current >= num) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [inView, target])

  const suffix = target.replace(/[0-9]/g, '')
  return <span>{count}{suffix}</span>
}

export default function ImpactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="impact"
      className="relative py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
      }}
      aria-label="NGO impact and mission"
    >
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        {/* Mission statement */}
        <div className="text-center mb-20">
          <motion.p
            className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Our Mission
          </motion.p>
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Technology should{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #60A5FA, #34D399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              empower people,
            </span>
            {' '}not intimidate them.
          </motion.h2>
          <motion.p
            className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            CyberSafe is a non-profit initiative working to improve digital awareness and cyber safety across communities — reaching people who need it most.
          </motion.p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1 tracking-tight">
                <Counter target={stat.number} inView={inView} />
              </div>
              <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
              {/* Visible placeholder note for developers */}
              <div className="text-slate-600 text-xs mt-1 font-mono">{stat.note}</div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          className="text-center text-slate-600 text-xs font-mono mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          ⚠️ Statistics above are placeholder demo values. Replace with verified data before publishing.
        </motion.p>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '🌍',
              title: 'Community First',
              desc: 'We reach underserved communities where digital literacy is needed most, in languages people understand.',
            },
            {
              icon: '🆓',
              title: 'Always Free',
              desc: 'Every resource, lesson, and tool on CyberSafe is and will always be completely free to access.',
            },
            {
              icon: '📖',
              title: 'Evidence-Based',
              desc: 'Our content is developed in collaboration with cybersecurity experts and vetted for accuracy.',
            },
          ].map((val, i) => (
            <motion.div
              key={val.title}
              className="glass-card-dark rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.5 }}
            >
              <div className="text-3xl mb-3">{val.icon}</div>
              <h3 className="font-bold text-white text-base mb-2">{val.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
