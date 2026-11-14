import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const threats = [
  { icon: '🎣', label: 'Phishing', color: '#EF4444', pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' },
  { icon: '💸', label: 'Online Scams', color: '#F59E0B', pos: 'top-1/4 right-0 translate-x-1/2' },
  { icon: '🪪', label: 'Identity Theft', color: '#EF4444', pos: 'bottom-1/4 right-0 translate-x-1/2' },
  { icon: '😔', label: 'Cyberbullying', color: '#8B5CF6', pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' },
  { icon: '🔓', label: 'Privacy Breach', color: '#F59E0B', pos: 'bottom-1/4 left-0 -translate-x-1/2' },
  { icon: '🌐', label: 'Fake Websites', color: '#EF4444', pos: 'top-1/4 left-0 -translate-x-1/2' },
]

function ThreatItem({ threat, index, inView }) {
  return (
    <motion.div
      className={`absolute ${threat.pos} flex flex-col items-center gap-1 z-10`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.5, type: 'spring', damping: 15 }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
        style={{ background: `${threat.color}15`, border: `1.5px solid ${threat.color}30` }}
      >
        {threat.icon}
      </div>
      <span className="text-xs font-bold text-slate-600 whitespace-nowrap bg-white/80 px-2 py-0.5 rounded-full shadow-sm">
        {threat.label}
      </span>
    </motion.div>
  )
}

const stats = [
  { number: '1 in 3', label: 'people have faced an online scam', icon: '📊' },
  { number: '₹10,000 Cr+', label: 'lost to digital fraud annually in India', icon: '💰' },
  { number: '70%', label: 'of victims were not aware of the risk', icon: '🧠' },
]

export default function ProblemSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="problem"
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 50%, #F8FAFC 100%)' }}
      aria-label="The digital threat landscape"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 dot-bg opacity-30" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <motion.p
            className="section-label mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            The Reality
          </motion.p>
          <motion.h2
            className="section-heading mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            ref={ref}
          >
            The digital world is changing.
          </motion.h2>
          <motion.p
            className="section-subheading mx-auto text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Every day, we use the internet for education, communication, banking, shopping, and essential services. But greater digital access also brings new risks.
          </motion.p>
        </div>

        {/* Threat visualization */}
        <div className="flex justify-center mb-20">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80">
            {/* Orbit rings */}
            {[1, 1.4, 1.7].map((scale, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-slate-200"
                style={{ transform: `scale(${scale})`, top: '50%', left: '50%', marginTop: `-${140 * scale}px`, marginLeft: `-${140 * scale}px`, width: `${280 * scale}px`, height: `${280 * scale}px` }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 0.5, scale: scale } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              />
            ))}

            {/* Center user */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
            >
              <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-slate-100">
                <span className="text-3xl">👤</span>
              </div>
            </motion.div>

            {/* Threat items */}
            {threats.map((t, i) => (
              <ThreatItem key={t.label} threat={t} index={i} inView={inView} />
            ))}

            {/* Animated threat lines */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 bg-gradient-to-b from-red-200 to-transparent origin-bottom"
                style={{
                  height: '90px',
                  bottom: '50%',
                  left: '50%',
                  transform: `rotate(${angle}deg) translateX(-50%)`,
                  transformOrigin: 'bottom center',
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={inView ? { scaleY: 1, opacity: 0.4 } : {}}
                transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">{stat.number}</div>
              <div className="text-sm text-slate-500 leading-relaxed">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
