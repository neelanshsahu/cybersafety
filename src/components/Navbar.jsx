import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Learn', href: '#learning' },
  { label: 'How It Works', href: '#solution' },
  { label: 'Resources', href: '#resources' },
  { label: 'About', href: '#impact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAnchor = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur' : 'nav-transparent'}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline group" aria-label="CyberSafe home">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm group-hover:scale-105 transition-transform">
              🛡️
            </div>
            <span className="font-extrabold text-slate-900 text-lg tracking-tight">CyberSafe</span>
          </Link>

          {/* Right desktop nav & CTAs */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-1" role="navigation" aria-label="Main navigation">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={e => handleAnchor(e, link.href)}
                  className="px-3.5 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-lg transition-all no-underline font-semibold"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <Link to="/signin" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 no-underline">
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary text-xs font-bold py-2 px-4 shadow-sm">
                Get Started
              </Link>
            </div>
          </div>

          {/* Hamburger */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <motion.span
              className="block w-5 h-0.5 bg-slate-800 rounded"
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-slate-800 rounded"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-slate-800 rounded"
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="mobile-menu md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              role="dialog"
              aria-label="Mobile navigation menu"
            >
              <button
                className="absolute top-5 right-5 p-2 text-slate-500 hover:text-slate-900"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={e => handleAnchor(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-3 pt-4">
                <Link to="/signin" className="text-slate-600 font-semibold no-underline" onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link to="/signup" className="btn-primary justify-center" onClick={() => setMobileOpen(false)}>Get Started</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
