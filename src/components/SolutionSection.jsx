import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    icon: '🤔',
    label: 'Confusion',
    desc: 'Unsure about online safety and where to start.',
    color: 'from-slate-100 to-slate-50',
    textColor: 'text-slate-500',
  },
  {
    icon: '📚',
    label: 'Learn',
    desc: 'Bite-sized lessons that fit your schedule.',
    color: 'from-blue-50 to-blue-100/50',
    textColor: 'text-blue-600',
  },
  {
    icon: '🧪',
    label: 'Practice',
    desc: 'Apply knowledge through real-world scenarios.',
    color: 'from-amber-50 to-amber-100/50',
    textColor: 'text-amber-600',
  },
  {
    icon: '💡',
    label: 'Understand',
    desc: 'See the "why" behind each security principle.',
    color: 'from-purple-50 to-purple-100/50',
    textColor: 'text-purple-600',
  },
  {
    icon: '🛡️',
    label: 'Protect',
    desc: 'Build lasting habits that keep you safe online.',
    color: 'from-emerald-50 to-emerald-100/50',
    textColor: 'text-emerald-600',
  },
]

export default function SolutionSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="solution"
      className="relative py-32 bg-white overflow-hidden"
      aria-label="How CyberSafe helps"
    >
      {/* Background accent */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full opacity-30"
        style={{
          background: 'radial-gradient(ellipse at right center, rgba(16, 185, 129, 0.08) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Text */}
          <div ref={ref}>
            <motion.p
              className="section-label mb-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
            >
              The Solution
            </motion.p>
            <motion.h2
              className="section-heading mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Knowledge is your first layer of{' '}
              <span className="gradient-text">protection.</span>
            </motion.h2>
            <motion.p
              className="section-subheading mb-10"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              CyberSafe turns complicated digital-safety concepts into simple, practical lessons that anyone can understand — regardless of their technical background.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {['Self-paced', 'Free forever', 'All skill levels', 'Multilingual-ready'].map(tag => (
                <span
                  key={tag}
                  className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-xs font-bold"
                >
                  ✓ {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Journey steps */}
          <div className="relative">
            {/* Vertical connecting line */}
            <motion.div
              className="absolute left-7 top-8 bottom-8 w-0.5 bg-gradient-to-b from-slate-200 via-blue-200 to-emerald-200"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              style={{ originY: 0 }}
            />

            <div className="space-y-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.label}
                  className={`relative flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r ${step.color} border border-white/60`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Step icon */}
                  <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl z-10">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold text-base mb-0.5 ${step.textColor}`}>{step.label}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                  {/* Arrow */}
                  {i < steps.length - 1 && (
                    <motion.div
                      className="absolute -bottom-3 left-7 text-slate-300 text-lg z-10"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.12, duration: 0.3 }}
                    >
                      ↓
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
