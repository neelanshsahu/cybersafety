import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Mail } from 'lucide-react';

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-xl font-semibold text-slate-900 mb-3 pb-2 border-b border-slate-200">
      {title}
    </h2>
    <div className="text-slate-600 leading-relaxed space-y-3">{children}</div>
  </section>
);

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
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

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <div className="mb-8">
          <span className="section-label">Legal</span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate-500">Last updated: November 2024</p>
        </div>

        <div className="glass-card p-8 rounded-2xl">
          <p className="text-slate-600 leading-relaxed mb-8">
            At CyberSafe, we believe privacy is a fundamental right. As a non-profit organization
            dedicated to digital literacy, we are committed to being transparent about what data we
            collect, why we collect it, and how we protect it. We collect only what is necessary to
            deliver our free educational services.
          </p>

          <Section title="1. What We Collect">
            <p>We collect the following information when you create an account or use our platform:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>Account information:</strong> Your name and email address when you register.</li>
              <li><strong>Learning progress:</strong> Quiz scores, completed modules, and badges earned — so your progress is saved across sessions.</li>
              <li><strong>Usage data:</strong> Pages visited and features used, in aggregate, to help us improve the platform.</li>
              <li><strong>Voluntarily submitted content:</strong> Any feedback or contact form messages you send us.</li>
            </ul>
            <p className="mt-3">We do <strong>not</strong> collect sensitive personal data such as government ID numbers, financial information, or location data beyond what your browser provides by default.</p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect solely to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Provide and maintain your account and learning progress.</li>
              <li>Send you important notifications about the platform (e.g., course updates).</li>
              <li>Respond to your support requests or feedback.</li>
              <li>Understand aggregate usage patterns to improve our content and features.</li>
              <li>Issue digital certificates or badges for completed courses.</li>
            </ul>
            <p className="mt-3">We will never use your data for advertising or profiling purposes.</p>
          </Section>

          <Section title="3. Data Storage & Security">
            <p>
              CyberSafe uses <strong>Supabase</strong> — a secure, open-source backend platform — to store
              user data. Supabase provides encrypted storage, row-level security policies, and
              SOC 2 Type II compliance.
            </p>
            <p>
              Your data is stored on servers within secure data centers. All data in transit is
              encrypted using TLS (HTTPS). Access to your data is restricted to authenticated
              sessions only, and our team members do not access individual user data unless
              you directly request support.
            </p>
            <p>
              Despite our best efforts, no system is 100% secure. We encourage you to use a
              strong, unique password for your CyberSafe account.
            </p>
          </Section>

          <Section title="4. Sharing Policy — We Never Sell Your Data">
            <p>
              We do not sell, rent, trade, or share your personal data with third parties for
              commercial purposes. Period. As a non-profit, our mission is your digital safety —
              not monetizing your information.
            </p>
            <p>We may share data only in these limited circumstances:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>Service providers:</strong> We use Supabase for data infrastructure. They act as a data processor under our instructions and do not use your data independently.</li>
              <li><strong>Legal obligations:</strong> If required by law or a valid court order, we may be compelled to disclose data. We will inform you if legally permitted to do so.</li>
              <li><strong>Aggregate statistics:</strong> We may share anonymized, aggregated usage statistics (e.g., "X users completed the phishing module") with our grant providers or in public reports.</li>
            </ul>
          </Section>

          <Section title="5. Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Ask us to correct inaccurate data.</li>
              <li><strong>Deletion:</strong> Request that we delete your account and associated personal data.</li>
              <li><strong>Portability:</strong> Request your learning data in a machine-readable format.</li>
              <li><strong>Withdraw consent:</strong> Opt out of any non-essential communications at any time.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{' '}
              <a href="mailto:contact@cybersafe.org.in" className="text-blue-600 hover:underline">
                contact@cybersafe.org.in
              </a>
              . We will respond within 7 business days.
            </p>
          </Section>

          <Section title="6. Cookies">
            <p>
              CyberSafe uses only essential cookies — specifically, a session cookie to keep you
              logged in while you use the platform. We do not use advertising cookies, tracking
              pixels, or third-party analytics scripts that profile your behaviour.
            </p>
            <p>
              You can disable cookies in your browser settings, but doing so will prevent you from
              staying logged in to your account.
            </p>
          </Section>

          <Section title="7. Children's Privacy">
            <p>
              Our platform is designed for general audiences and is suitable for users of all ages.
              However, we do not knowingly collect personal data from children under 13 without
              verifiable parental consent. If you believe a child has registered without consent,
              please contact us immediately and we will delete the account.
            </p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p>
              We may update this Privacy Policy as our platform evolves. When we make significant
              changes, we will notify registered users by email and update the "Last updated" date
              at the top of this page. We encourage you to review this page periodically.
            </p>
          </Section>

          <Section title="9. Contact Us">
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out:</p>
            <div className="mt-3 p-4 bg-blue-50 rounded-xl flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-slate-800">CyberSafe Privacy Team</p>
                <a href="mailto:contact@cybersafe.org.in" className="text-blue-600 hover:underline text-sm">
                  contact@cybersafe.org.in
                </a>
              </div>
            </div>
          </Section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span>🛡️</span>
            <span>© 2024 CyberSafe. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Use</Link>
            <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
