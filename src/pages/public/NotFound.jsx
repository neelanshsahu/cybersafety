import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, LayoutDashboard, Shield, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full">
        {/* Shield icon with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute w-24 h-24 bg-blue-100 rounded-full blur-xl" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
        </motion.div>

        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-8xl sm:text-9xl font-black gradient-text leading-none select-none">
            404
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-slate-500 text-base leading-relaxed mb-2">
            Looks like this page doesn't exist — or it may have been moved or deleted.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            Don't worry, your data and progress are safe. Let's get you back on track.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <Link
            to="/"
            className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </Link>
          <Link
            to="/dashboard"
            className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <LayoutDashboard className="w-4 h-4" />
            Go to Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="mt-10 pt-8 border-t border-slate-200 w-full"
        >
          <p className="text-sm text-slate-400 mb-3">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {[
              { label: 'Learning Modules', to: '/dashboard' },
              { label: 'Privacy Policy', to: '/privacy' },
              { label: 'Terms of Use', to: '/terms' },
              { label: 'Contact Us', to: '/contact' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors">
            <span className="text-lg">🛡️</span>
            <span className="text-sm font-medium">CyberSafe</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
