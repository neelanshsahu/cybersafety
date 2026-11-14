import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, ExternalLink, CheckCircle, Send, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name.';
    if (!form.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) newErrors.message = 'Please enter a message.';
    else if (form.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const FieldError = ({ field }) =>
    errors[field] ? (
      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
        <AlertCircle className="w-3.5 h-3.5" />
        {errors[field]}
      </p>
    ) : null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm text-slate-500 group-hover:text-blue-600 transition-colors">Back to Home</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span className="text-lg font-bold text-slate-900">CyberSafe</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 py-14 px-6 text-center text-white">
        <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Contact CyberSafe</h1>
        <p className="text-blue-100 max-w-xl mx-auto text-base">
          Have a question, feedback, or want to collaborate? We'd love to hear from you.
          We're a small volunteer-driven team and we read every message.
        </p>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-1">Send us a message</h2>
              <p className="text-sm text-slate-500 mb-6">We'll respond within 2–3 business days.</p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Message sent!</h3>
                    <p className="text-slate-500 max-w-sm">
                      Thank you for reaching out, <strong>{form.name}</strong>. We'll get back to you
                      at <strong>{form.email}</strong> within 2–3 business days.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                      className="mt-6 btn-secondary text-sm"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Priya Sharma"
                        className={`w-full px-4 py-2.5 rounded-xl border text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-sm ${
                          errors.name ? 'border-red-400' : 'border-slate-200'
                        }`}
                      />
                      <FieldError field="name" />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-2.5 rounded-xl border text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-sm ${
                          errors.email ? 'border-red-400' : 'border-slate-200'
                        }`}
                      />
                      <FieldError field="email" />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help, share feedback, or ask a question..."
                        className={`w-full px-4 py-2.5 rounded-xl border text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-sm resize-none ${
                          errors.message ? 'border-red-400' : 'border-slate-200'
                        }`}
                      />
                      <div className="flex justify-between items-start mt-1">
                        <FieldError field="message" />
                        <span className="text-xs text-slate-400 ml-auto">{form.message.length} chars</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-5">
            {/* About */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🛡️</span>
                <h3 className="font-semibold text-slate-900">About CyberSafe</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                CyberSafe is a non-profit initiative dedicated to making digital literacy accessible
                to every citizen in India — especially those most vulnerable to online threats.
                Our platform is free, open, and built by volunteers.
              </p>
            </div>

            {/* Email */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                Email Us
              </h3>
              <a
                href="mailto:contact@cybersafe.org.in"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                contact@cybersafe.org.in
              </a>
              <p className="text-xs text-slate-500 mt-1">Response time: 2–3 business days</p>
            </div>

            {/* Cyber Crime Reporting */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                Report a Cyber Crime
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                If you've been a victim of cybercrime, don't contact us — please use official channels
                for faster help:
              </p>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline mb-3"
              >
                <ExternalLink className="w-4 h-4" />
                cybercrime.gov.in
              </a>
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-red-100">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Financial Cyber Fraud Helpline</p>
                  <p className="text-lg font-bold text-slate-900 leading-tight">1930</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Available 24×7 for financial cyber fraud</p>
            </div>

            {/* Links */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-slate-900 mb-3 text-sm">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <Link to="/privacy" className="flex items-center justify-between text-slate-600 hover:text-blue-600 transition-colors">
                  <span>Privacy Policy</span>
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                </Link>
                <Link to="/terms" className="flex items-center justify-between text-slate-600 hover:text-blue-600 transition-colors">
                  <span>Terms of Use</span>
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span>🛡️</span>
            <span>© 2024 CyberSafe. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
