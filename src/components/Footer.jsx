import { Link } from 'react-router-dom'

const footerLinks = {
  Platform: [
    { label: 'Learn', href: '#learning' },
    { label: 'How It Works', href: '#solution' },
    { label: 'Resources', href: '#resources' },
    { label: 'About', href: '#impact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
    { label: 'Contact', href: '/contact' },
  ],
}

export default function Footer() {
  const handleAnchor = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 no-underline mb-4 group" aria-label="CyberSafe home">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm group-hover:scale-105 transition-transform">
                🛡️
              </div>
              <span className="font-extrabold text-white text-lg">CyberSafe</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 mb-4">
              Cyber Safety & Digital Literacy for All
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              A non-profit initiative for digital awareness and cyber safety education.
            </p>
          </div>

          {/* Nav groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="font-bold text-slate-300 text-sm mb-4">{group}</h3>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    {link.href.startsWith('#') ? (
                      <a
                        href={link.href}
                        onClick={e => handleAnchor(e, link.href)}
                        className="text-sm text-slate-500 hover:text-slate-200 transition-colors no-underline"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-slate-500 hover:text-slate-200 transition-colors no-underline"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Join CTA */}
          <div>
            <h3 className="font-bold text-slate-300 text-sm mb-4">Get Started</h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">Start your cyber safety journey today — it's free.</p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all no-underline"
            >
              Create Account →
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600">
            © 2024 CyberSafe — Cyber Safety & Digital Literacy for All.{' '}
            <span className="text-slate-700">All rights reserved.</span>
          </p>
          <div className="flex items-center gap-4">
            {/* Social placeholder icons */}
            {[
              { icon: '🐦', label: 'Twitter/X', href: '#' },
              { icon: '📘', label: 'Facebook', href: '#' },
              { icon: '▶️', label: 'YouTube', href: '#' },
              { icon: '💼', label: 'LinkedIn', href: '#' },
            ].map(social => (
              <a
                key={social.label}
                href={social.href}
                className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-sm transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-700 text-center leading-relaxed">
            This website is for educational purposes only. Scam examples shown are simulated for demonstration. 
            CyberSafe does not claim to detect or prevent all cyber threats. 
            Always verify information with official sources.
          </p>
        </div>
      </div>
    </footer>
  )
}
