import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, AlertTriangle } from 'lucide-react';

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-xl font-semibold text-slate-900 mb-3 pb-2 border-b border-slate-200">
      {title}
    </h2>
    <div className="text-slate-600 leading-relaxed space-y-3">{children}</div>
  </section>
);

export default function Terms() {
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
          <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-2">Terms of Use</h1>
          <p className="text-sm text-slate-500">Last updated: November 2024</p>
        </div>

        {/* Important callout */}
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> CyberSafe is a free educational platform run by a non-profit
            organization. We provide digital literacy resources and are <strong>not</strong> a professional
            cybersecurity service or incident response provider. Please read these terms carefully.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl">
          <p className="text-slate-600 leading-relaxed mb-8">
            Welcome to CyberSafe. By accessing or using our platform, you agree to be bound by
            these Terms of Use. These terms are written to be clear and fair — we want everyone
            to benefit from free, accessible digital literacy education.
          </p>

          <Section title="1. Acceptance of Terms">
            <p>
              By creating an account or using any part of the CyberSafe platform, you confirm that
              you have read, understood, and agree to these Terms of Use and our{' '}
              <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>
            <p>
              If you are under 18, you should review these terms with a parent or guardian.
              By using the platform, you represent that you have the capacity to enter into this
              agreement, or that your parent/guardian has consented on your behalf.
            </p>
          </Section>

          <Section title="2. Use of Platform">
            <p>
              CyberSafe grants you a personal, non-exclusive, non-transferable, revocable license
              to access and use the platform for your personal educational purposes.
            </p>
            <p>You may:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Access all courses, quizzes, and learning materials freely.</li>
              <li>Earn and display your badges and certificates for personal use.</li>
              <li>Share publicly available educational content with attribution to CyberSafe.</li>
            </ul>
          </Section>

          <Section title="3. Educational Purpose — Not a Cybersecurity Service">
            <p>
              CyberSafe is an <strong>educational platform</strong> designed to improve digital
              literacy and awareness among the public. All content on this platform — including
              articles, quizzes, videos, and guides — is provided for general informational and
              educational purposes only.
            </p>
            <p>
              <strong>CyberSafe is not a cybersecurity firm, incident response team, or legal advisor.</strong>{' '}
              We do not provide professional cybersecurity services, threat analysis, or legal counsel.
              If you are experiencing a cyberattack, data breach, or financial fraud, please contact
              your local law enforcement, your bank, or the{' '}
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                National Cyber Crime Reporting Portal (cybercrime.gov.in)
              </a>{' '}
              or helpline <strong>1930</strong>.
            </p>
            <p>
              Reliance on any content on this platform for making security decisions is at your own
              discretion. We encourage you to consult qualified professionals for specific advice.
            </p>
          </Section>

          <Section title="4. Account Responsibilities">
            <p>When you create an account on CyberSafe, you agree to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Provide accurate and truthful registration information.</li>
              <li>Keep your password secure and not share your account with others.</li>
              <li>Notify us immediately at{' '}
                <a href="mailto:contact@cybersafe.org.in" className="text-blue-600 hover:underline">
                  contact@cybersafe.org.in
                </a>{' '}
                if you suspect unauthorized access to your account.
              </li>
              <li>Be responsible for all activity that occurs under your account.</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate accounts that violate these terms,
              without prior notice in cases of serious violations.
            </p>
          </Section>

          <Section title="5. Prohibited Conduct">
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Use the platform for any unlawful purpose or in violation of any applicable laws.</li>
              <li>Attempt to gain unauthorized access to our systems, servers, or databases.</li>
              <li>Scrape, copy, or redistribute our course content for commercial purposes.</li>
              <li>Impersonate any person or entity, including CyberSafe staff.</li>
              <li>Upload or transmit any malware, harmful scripts, or malicious content.</li>
              <li>Harass, bully, or harm other users through any platform features.</li>
              <li>Misuse our learning content to promote or facilitate cybercrime.</li>
            </ul>
            <p>
              Violations may result in immediate account suspension and, where applicable,
              reporting to law enforcement authorities.
            </p>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              All content on the CyberSafe platform — including course materials, graphics, branding,
              and software — is owned by or licensed to CyberSafe and is protected by applicable
              copyright and intellectual property laws.
            </p>
            <p>
              You are welcome to use our educational content for personal learning or non-commercial
              sharing with attribution. For any other use, please contact us for permission.
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>
              CyberSafe provides this platform "as is" and makes no warranties — express or implied —
              regarding the accuracy, completeness, or fitness for any particular purpose of the content.
            </p>
            <p>
              To the maximum extent permitted by applicable law, CyberSafe and its volunteers,
              trustees, and contributors shall not be liable for any direct, indirect, incidental,
              or consequential damages arising from your use of the platform or reliance on any
              content herein.
            </p>
            <p>
              This includes — but is not limited to — losses arising from cybersecurity incidents,
              financial fraud, or decisions made based on information found on this platform. Again,
              please consult qualified professionals for critical security decisions.
            </p>
          </Section>

          <Section title="8. Changes to These Terms">
            <p>
              We may update these Terms of Use from time to time as the platform grows or as
              required by law. When we make meaningful changes, we will notify registered users
              by email and update the "Last updated" date at the top of this page.
            </p>
            <p>
              Continuing to use the platform after changes are posted constitutes your acceptance
              of the revised terms.
            </p>
          </Section>

          <Section title="9. Governing Law">
            <p>
              These Terms of Use are governed by the laws of India. Any disputes arising out of
              or in connection with these terms shall be subject to the jurisdiction of courts
              in India.
            </p>
          </Section>

          <Section title="10. Contact Us">
            <p>
              If you have questions about these Terms or need to report a violation, please get in touch:
            </p>
            <div className="mt-3 p-4 bg-blue-50 rounded-xl flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-slate-800">CyberSafe Legal & Compliance</p>
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
            <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
