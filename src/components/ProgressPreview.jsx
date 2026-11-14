import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const lessons = [
  { icon: '🔐', title: 'Password Security', complete: true },
  { icon: '🎣', title: 'Phishing Awareness', complete: true },
  { icon: '📲', title: 'Social Media Safety', complete: true },
  { icon: '💳', title: 'Digital Payments', complete: false },
  { icon: '🔒', title: 'Privacy Protection', complete: false },
]

const badges = [
  { icon: '🛡️', label: 'First Step', color: 'bg-blue-100 border-blue-200' },
  { icon: '🔐', label: 'Password Pro', color: 'bg-emerald-100 border-emerald-200' },
  { icon: '🎣', label: 'Phish Spotter', color: 'bg-amber-100 border-amber-200' },
  { icon: '⭐', label: 'Safety Star', color: 'bg-purple-100 border-purple-200' },
]

export default function ProgressPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [progress, setProgress] = useState(0)
  const [visibleBadges, setVisibleBadges] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true
    // Animate progress bar
    let p = 0
    const interval = setInterval(() => {
      p += 2
      if (p >= 78) { p = 78; clearInterval(interval) }
      setProgress(p)
    }, 30)
    // Badge reveal
    ;[800, 1100, 1400, 1700].forEach((delay, i) => {
      setTimeout(() => setVisibleBadges(prev => prev + 1), delay)
    })
    return () => clearInterval(interval)
  }, [inView])

  return (
    <section
      id="progress"
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F0F9FF 0%, #F8FAFC 50%, #F0FDF4 100%)' }}
      aria-label="User progress preview"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16" ref={ref}>
          <motion.p
            className="section-label mb-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Your Journey
          </motion.p>
          <motion.h2
            className="section-heading mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Turn knowledge into{' '}
            <span className="gradient-text">safer habits.</span>
          </motion.h2>
          <motion.p
            className="section-subheading mx-auto text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Every lesson you complete builds your cyber safety profile and earns you recognition.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left: Progress dashboard */}
          <motion.div
            className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-bold text-slate-900 mb-1 text-lg">Your Cyber Safety Journey</h3>
            <p className="text-slate-400 text-sm mb-6">Keep going — you're making real progress</p>

            {/* Overall Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-700">Overall Progress</span>
                <span className="text-sm font-bold text-blue-600">{progress}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Lesson list */}
            <div className="space-y-3 mb-6">
              {lessons.map((lesson, i) => (
                <motion.div
                  key={lesson.title}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300 ${
                      lesson.complete ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {lesson.complete ? '✓' : '○'}
                  </div>
                  <span
                    className={`flex-1 text-sm font-medium ${
                      lesson.complete ? 'text-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {lesson.icon} {lesson.title}
                  </span>
                  {lesson.complete && (
                    <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">Done</span>
                  )}
                  {!lesson.complete && (
                    <span className="text-xs text-slate-400 font-semibold">Locked</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Badges earned */}
            <div className="border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-700">🏆 Badges Earned</span>
                <span className="text-sm font-bold text-blue-600">{visibleBadges} / {badges.length}</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {badges.map((badge, i) => (
                  <motion.div
                    key={badge.label}
                    className={`w-14 h-14 rounded-2xl border flex flex-col items-center justify-center gap-0.5 ${badge.color} ${i < visibleBadges ? 'opacity-100' : 'opacity-20'}`}
                    animate={i < visibleBadges ? { scale: [1.2, 1], opacity: 1 } : { scale: 1, opacity: 0.2 }}
                    transition={{ duration: 0.4, type: 'spring', damping: 12 }}
                    title={badge.label}
                  >
                    <span className="text-xl">{badge.icon}</span>
                    <span className="text-[9px] font-bold text-center leading-tight text-slate-600 px-0.5">
                      {badge.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Feature highlights */}
          <div className="space-y-6">
            {[
              {
                icon: '📊',
                color: 'bg-blue-50',
                title: 'Visual Progress Tracking',
                desc: 'See exactly where you are in your learning journey with clear visual dashboards and progress indicators.',
              },
              {
                icon: '🏆',
                color: 'bg-amber-50',
                title: 'Achievement Badges',
                desc: 'Earn meaningful recognition as you complete modules — share your progress with family and friends.',
              },
              {
                icon: '🔄',
                color: 'bg-emerald-50',
                title: 'Resume Anytime',
                desc: 'Your progress is always saved. Pick up exactly where you left off on any device.',
              },
              {
                icon: '🎯',
                color: 'bg-purple-50',
                title: 'Personalized Recommendations',
                desc: 'CyberSafe suggests next steps based on your profile and areas that need more attention.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
              >
                <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
