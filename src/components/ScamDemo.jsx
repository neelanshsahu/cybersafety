import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const flags = [
  {
    id: 'urgency',
    label: 'Urgent Language',
    desc: '"Account will be blocked in 24 hours" — creates panic to bypass critical thinking.',
    color: '#EF4444',
    bgColor: 'rgba(239,68,68,0.08)',
    borderColor: 'rgba(239,68,68,0.25)',
    selector: 'urgency-text',
  },
  {
    id: 'link',
    label: 'Suspicious Link',
    desc: 'Shortened URLs hide the real destination. Never click links in unsolicited messages.',
    color: '#F59E0B',
    bgColor: 'rgba(245,158,11,0.08)',
    borderColor: 'rgba(245,158,11,0.25)',
    selector: 'suspicious-link',
  },
  {
    id: 'action',
    label: 'Requests Personal Action',
    desc: 'Legitimate banks NEVER ask you to update KYC through a link in a message.',
    color: '#EF4444',
    bgColor: 'rgba(239,68,68,0.08)',
    borderColor: 'rgba(239,68,68,0.25)',
    selector: 'kyc-text',
  },
]

export default function ScamDemo() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [step, setStep] = useState(0)
  const [analysing, setAnalysing] = useState(false)

  useEffect(() => {
    if (!inView) return
    const timer1 = setTimeout(() => setAnalysing(true), 500)
    const timer2 = setTimeout(() => setStep(1), 1200)
    const timer3 = setTimeout(() => setStep(2), 2000)
    const timer4 = setTimeout(() => setStep(3), 2800)
    return () => [timer1, timer2, timer3, timer4].forEach(clearTimeout)
  }, [inView])

  return (
    <section
      id="scam-demo"
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF7ED 30%, #FFF7ED 70%, #FFFFFF 100%)' }}
      aria-label="Scam message demonstration"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16" ref={ref}>
          <motion.p
            className="section-label mb-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Real-World Example
          </motion.p>
          <motion.h2
            className="section-heading mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            See the warning signs{' '}
            <span className="text-red-500">before it's too late.</span>
          </motion.h2>
          <motion.p
            className="section-subheading mx-auto text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            This is how a real phishing message looks. Scroll and watch the system identify the red flags.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Left: Fake SMS */}
          <div>
            <motion.div
              className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 max-w-sm mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* SMS header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white text-sm font-bold">B</div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Bank-SECURE</div>
                  <div className="text-xs text-slate-400">SMS • Just now</div>
                </div>
                <div className="ml-auto">
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                </div>
              </div>

              {/* Message body */}
              <div className="space-y-3 text-sm leading-relaxed">
                {/* Urgent text */}
                <motion.div
                  id="urgency-text"
                  className={`transition-all duration-500 rounded-lg p-2 -mx-2 ${step >= 1 ? 'bg-red-50 border-l-2 border-red-400' : ''}`}
                >
                  <span className="font-medium text-slate-700">⚠️ Your account will be</span>{' '}
                  <span className={`font-bold ${step >= 1 ? 'text-red-600' : 'text-slate-700'}`}>blocked within 24 hours.</span>
                  {step >= 1 && (
                    <motion.span
                      className="ml-2 inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ⚠ Red Flag
                    </motion.span>
                  )}
                </motion.div>

                {/* KYC text */}
                <motion.div
                  id="kyc-text"
                  className={`transition-all duration-500 rounded-lg p-2 -mx-2 ${step >= 3 ? 'bg-red-50 border-l-2 border-red-400' : ''}`}
                >
                  <span className={step >= 3 ? 'text-red-600 font-semibold' : 'text-slate-700'}>
                    Update your KYC immediately:
                  </span>
                  {step >= 3 && (
                    <motion.span
                      className="ml-2 inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ⚠ Red Flag
                    </motion.span>
                  )}
                </motion.div>

                {/* Link */}
                <motion.div
                  id="suspicious-link"
                  className={`transition-all duration-500 rounded-lg p-2 -mx-2 ${step >= 2 ? 'bg-amber-50 border-l-2 border-amber-400' : ''}`}
                >
                  <span className={`font-mono text-sm ${step >= 2 ? 'text-amber-700 font-bold' : 'text-blue-600 underline'}`}>
                    bit.ly/secure-kyc-update
                  </span>
                  {step >= 2 && (
                    <motion.span
                      className="ml-2 inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ⚠ Suspicious URL
                    </motion.span>
                  )}
                </motion.div>

                {/* CTA button */}
                <div className="pt-2">
                  <div
                    className="w-full py-3 rounded-xl text-center font-bold text-sm text-white cursor-default select-none"
                    style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}
                    aria-label="Fake button - do not click"
                  >
                    Update Now
                  </div>
                  <p className="text-xs text-slate-400 text-center mt-1.5">⚠ This is a simulated scam message for educational purposes</p>
                </div>
              </div>
            </motion.div>

            {/* Analysis badge */}
            {analysing && (
              <motion.div
                className="mt-4 mx-auto max-w-sm flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse flex-shrink-0" />
                <span className="text-sm font-semibold">
                  {step === 0 ? 'Analysing message...' : `${step} Red Flag${step > 1 ? 's' : ''} Detected`}
                </span>
                {step >= 3 && (
                  <motion.span
                    className="ml-auto text-red-400 font-bold text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ⚠ 3/3
                  </motion.span>
                )}
              </motion.div>
            )}
          </div>

          {/* Right: Flag explanations */}
          <div className="space-y-4">
            {flags.map((flag, i) => (
              <motion.div
                key={flag.id}
                className="rounded-2xl border p-5 transition-all duration-500"
                style={{
                  background: step >= i + 1 ? flag.bgColor : 'white',
                  borderColor: step >= i + 1 ? flag.borderColor : '#F1F5F9',
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base transition-all duration-300"
                    style={{ background: step >= i + 1 ? flag.color : '#F1F5F9', color: 'white' }}
                  >
                    {step >= i + 1 ? '⚠' : `${i + 1}`}
                  </div>
                  <div>
                    <h3
                      className="font-bold text-sm mb-1 transition-colors duration-300"
                      style={{ color: step >= i + 1 ? flag.color : '#0F172A' }}
                    >
                      {flag.label}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{flag.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Conclusion */}
            <motion.div
              className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5"
              initial={{ opacity: 0, y: 15 }}
              animate={step >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">🛡️</div>
                <div>
                  <h3 className="font-bold text-emerald-800 text-sm mb-1">Stay Protected</h3>
                  <p className="text-sm text-emerald-700 leading-relaxed">
                    Learning to recognize these warning signs can help you avoid common online scams. CyberSafe teaches you exactly what to look for.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
