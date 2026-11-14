import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const audiences = [
  {
    id: 'students',
    icon: '🎓',
    label: 'Students',
    tagline: 'Navigate the digital world safely.',
    desc: 'Learn about social media safety, gaming risks, cyberbullying, and how to protect your personal information online.',
    topics: ['Social Media Privacy', 'Gaming Safety', 'Cyberbullying Response', 'Digital Footprint'],
    accentColor: '#2563EB',
    bgGradient: 'from-blue-50 to-blue-100/30',
    borderColor: 'border-blue-200',
    tagBg: 'bg-blue-100 text-blue-800',
    mockup: [
      { label: 'Social Media Safety', progress: 85, color: 'bg-blue-500' },
      { label: 'Gaming Awareness', progress: 60, color: 'bg-blue-400' },
      { label: 'Cyberbullying Module', progress: 100, color: 'bg-emerald-500' },
    ],
  },
  {
    id: 'parents',
    icon: '👨‍👩‍👧',
    label: 'Parents',
    tagline: 'Keep your family safer online.',
    desc: 'Understand the risks your children face online, learn about family safety settings, and recognize common digital scams targeting families.',
    topics: ['Family Safety Settings', 'Online Scam Awareness', 'Child Online Safety', 'Digital Wellbeing'],
    accentColor: '#10B981',
    bgGradient: 'from-emerald-50 to-emerald-100/30',
    borderColor: 'border-emerald-200',
    tagBg: 'bg-emerald-100 text-emerald-800',
    mockup: [
      { label: 'Parental Controls Setup', progress: 90, color: 'bg-emerald-500' },
      { label: 'Scam Recognition', progress: 75, color: 'bg-emerald-400' },
      { label: 'Family Safety Guide', progress: 45, color: 'bg-emerald-300' },
    ],
  },
  {
    id: 'teachers',
    icon: '👩‍🏫',
    label: 'Teachers',
    tagline: 'Bring digital safety to your classroom.',
    desc: 'Access ready-to-use classroom resources, lesson plans, and materials to teach digital safety to students of all ages.',
    topics: ['Classroom Resources', 'Digital Safety Curriculum', 'Age-appropriate Content', 'Parental Engagement'],
    accentColor: '#8B5CF6',
    bgGradient: 'from-purple-50 to-purple-100/30',
    borderColor: 'border-purple-200',
    tagBg: 'bg-purple-100 text-purple-800',
    mockup: [
      { label: 'Lesson Plans (8 available)', progress: 100, color: 'bg-purple-500' },
      { label: 'Student Worksheets', progress: 100, color: 'bg-purple-400' },
      { label: 'Assessment Tools', progress: 70, color: 'bg-purple-300' },
    ],
  },
  {
    id: 'seniors',
    icon: '👴',
    label: 'Senior Citizens',
    tagline: 'Stay safe in the digital age.',
    desc: 'Simple, clear guidance on avoiding UPI scams, fake phone calls, OTP fraud, and digital payment safety designed for older adults.',
    topics: ['UPI & Payment Safety', 'Phone Scam Recognition', 'OTP Security', 'Banking Fraud Prevention'],
    accentColor: '#F59E0B',
    bgGradient: 'from-amber-50 to-amber-100/30',
    borderColor: 'border-amber-200',
    tagBg: 'bg-amber-100 text-amber-800',
    mockup: [
      { label: 'OTP Safety Guide', progress: 100, color: 'bg-amber-500' },
      { label: 'Scam Phone Calls', progress: 80, color: 'bg-amber-400' },
      { label: 'UPI Payment Safety', progress: 55, color: 'bg-amber-300' },
    ],
  },
]

function AudienceCard({ audience, index, inView }) {
  return (
    <motion.div
      className={`rounded-3xl border bg-gradient-to-br ${audience.bgGradient} ${audience.borderColor} p-8 flex flex-col gap-6`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm bg-white"
        >
          {audience.icon}
        </div>
        <div>
          <h3 className="font-extrabold text-slate-900 text-xl mb-1">{audience.label}</h3>
          <p className="text-sm font-semibold" style={{ color: audience.accentColor }}>
            {audience.tagline}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-600 text-sm leading-relaxed">{audience.desc}</p>

      {/* Topics */}
      <div className="flex flex-wrap gap-2">
        {audience.topics.map(topic => (
          <span
            key={topic}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full ${audience.tagBg}`}
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Mini progress mockup */}
      <div className="bg-white/70 rounded-2xl p-4 space-y-3">
        {audience.mockup.map((item, i) => (
          <div key={item.label}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-slate-600">{item.label}</span>
              <span className="text-xs font-bold text-slate-700">{item.progress}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${item.color} rounded-full`}
                initial={{ width: 0 }}
                animate={inView ? { width: `${item.progress}%` } : {}}
                transition={{ delay: 0.5 + index * 0.15 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function AudienceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="audience"
      className="relative py-32 bg-white overflow-hidden"
      aria-label="Who CyberSafe is for"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16" ref={ref}>
          <motion.p
            className="section-label mb-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Built For Everyone
          </motion.p>
          <motion.h2
            className="section-heading mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Digital safety shouldn't depend on{' '}
            <span className="gradient-text">how technical you are.</span>
          </motion.h2>
          <motion.p
            className="section-subheading mx-auto text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            CyberSafe is designed for people at every stage of life — from students to senior citizens.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, i) => (
            <AudienceCard
              key={audience.id}
              audience={audience}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
