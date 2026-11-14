import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const question = {
  text: 'Someone calls claiming to be from your bank and asks for your OTP. What should you do?',
  options: [
    { id: 'a', text: 'Share the OTP immediately', correct: false },
    { id: 'b', text: 'Ask for their employee ID', correct: false },
    { id: 'c', text: 'Never share your OTP with anyone', correct: true },
    { id: 'd', text: 'Send it through WhatsApp', correct: false },
  ],
  explanation: 'Your OTP (One-Time Password) is the key to your account. Legitimate banks and organizations will NEVER ask for your OTP over a phone call, message, or email. If someone asks for it — it\'s always a scam.',
}

export default function QuizPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [phase, setPhase] = useState('idle') // idle | selecting | correct | score
  const [selectedOption, setSelectedOption] = useState(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true
    const t1 = setTimeout(() => setPhase('selecting'), 800)
    const t2 = setTimeout(() => setSelectedOption('c'), 1600)
    const t3 = setTimeout(() => setPhase('correct'), 2200)
    const t4 = setTimeout(() => setPhase('score'), 3500)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [inView])

  return (
    <section
      id="quiz"
      className="relative py-32 bg-white overflow-hidden"
      aria-label="Interactive quiz preview"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(37,99,235,0.06) 0%, transparent 60%)',
        }}
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
            Active Learning
          </motion.p>
          <motion.h2
            className="section-heading mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Don't just read.{' '}
            <span className="gradient-text">Practice.</span>
          </motion.h2>
          <motion.p
            className="section-subheading mx-auto text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            CyberSafe uses real-world scenarios to test and build your knowledge — not just theory.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left: Quiz interface */}
          <motion.div
            className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-100 text-xs font-semibold">Question 3 of 10</span>
                <span className="text-blue-100 text-xs font-semibold">⏱ 1:32 remaining</span>
              </div>
              <div className="mt-2 h-1.5 bg-blue-500/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: '20%' }}
                  animate={inView ? { width: '30%' } : {}}
                  transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="p-6">
              <p className="font-semibold text-slate-900 leading-relaxed mb-6 text-base">
                {question.text}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((opt, i) => {
                  const isSelected = selectedOption === opt.id
                  const isCorrect = opt.correct && phase !== 'idle' && phase !== 'selecting'
                  const isWrong = isSelected && !opt.correct && phase !== 'idle'

                  return (
                    <motion.div
                      key={opt.id}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        isCorrect
                          ? 'border-emerald-400 bg-emerald-50'
                          : isWrong
                          ? 'border-red-300 bg-red-50'
                          : isSelected
                          ? 'border-blue-400 bg-blue-50'
                          : 'border-slate-100 hover:border-slate-200 bg-white'
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                    >
                      {/* Radio indicator */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isCorrect
                            ? 'border-emerald-500 bg-emerald-500'
                            : isSelected
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-slate-300'
                        }`}
                      >
                        {(isCorrect || (isSelected && phase === 'selecting')) && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-white"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          isCorrect ? 'text-emerald-800' : isSelected ? 'text-blue-800' : 'text-slate-700'
                        }`}
                      >
                        {opt.text}
                      </span>
                      {isCorrect && (
                        <motion.span
                          className="ml-auto text-emerald-500 font-bold check-pop"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3, type: 'spring', damping: 10 }}
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {phase === 'correct' || phase === 'score' ? (
                  <motion.div
                    className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-500 text-lg flex-shrink-0">✓</span>
                      <div>
                        <p className="text-sm font-bold text-emerald-800 mb-1">Correct!</p>
                        <p className="text-sm text-emerald-700 leading-relaxed">{question.explanation}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: Score panel */}
          <div className="space-y-6">
            {/* Score card */}
            <AnimatePresence>
              {phase === 'score' && (
                <motion.div
                  className="glass-card rounded-3xl p-8 text-center"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, type: 'spring', damping: 15 }}
                >
                  <p className="text-slate-500 text-sm font-semibold mb-2">Cyber Safety Score</p>
                  <div className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">8 / 10</div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '80%' }}
                      transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-xs text-slate-500">You answered 8 questions correctly — great progress!</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Feature bullets */}
            {[
              { icon: '🧠', title: 'Real-world scenarios', desc: 'Practice with examples based on actual scam patterns.' },
              { icon: '📈', title: 'Track your progress', desc: 'Watch your cyber safety score improve over time.' },
              { icon: '🏆', title: 'Earn badges', desc: 'Complete modules to unlock recognition and certificates.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.12, duration: 0.5 }}
              >
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-0.5">{item.title}</h3>
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
