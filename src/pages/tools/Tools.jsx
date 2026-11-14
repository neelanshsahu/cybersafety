import { useState, useCallback } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import {
  Eye, EyeOff, Shield, AlertTriangle, CheckCircle, XCircle,
  Info, ExternalLink, ChevronRight, Lock, Globe, Smartphone,
} from 'lucide-react';

// ─── Shared Tab Bar ──────────────────────────────────────────────────────────

const TABS = [
  { id: 'password', label: 'Password Checker', icon: Lock },
  { id: 'scam',     label: 'Scam Simulator',   icon: Smartphone },
  { id: 'url',      label: 'URL Inspector',     icon: Globe },
  { id: 'incident', label: 'Incident Help',     icon: Shield },
];

// ─── Tool A: Password Strength Checker ───────────────────────────────────────

const COMMON_PATTERNS = [
  'password', '123456', 'qwerty', 'letmein', 'welcome', 'admin',
  'login', 'pass', '111111', 'abc123', 'iloveyou', 'monkey',
];

function analyzePassword(pwd) {
  const checks = {
    length8:    pwd.length >= 8,
    length12:   pwd.length >= 12,
    uppercase:  /[A-Z]/.test(pwd),
    lowercase:  /[a-z]/.test(pwd),
    number:     /[0-9]/.test(pwd),
    special:    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd),
    notCommon:  pwd.length > 0 && !COMMON_PATTERNS.some(p => pwd.toLowerCase().includes(p)),
  };

  let score = 0;
  if (checks.length8)   score += 1;
  if (checks.length12)  score += 1;
  if (checks.uppercase) score += 1;
  if (checks.lowercase) score += 1;
  if (checks.number)    score += 1;
  if (checks.special)   score += 1;
  if (!checks.notCommon) score = Math.max(0, score - 2);

  let level, color, barWidth;
  if (pwd.length === 0) {
    level = ''; color = 'bg-slate-200'; barWidth = '0%';
  } else if (score <= 2) {
    level = 'Weak'; color = 'bg-red-500'; barWidth = '25%';
  } else if (score <= 4) {
    level = 'Fair'; color = 'bg-amber-500'; barWidth = '60%';
  } else {
    level = 'Strong'; color = 'bg-emerald-500'; barWidth = '90%';
  }

  const suggestions = [];
  if (!checks.length8)   suggestions.push('Use at least 8 characters');
  if (!checks.length12)  suggestions.push('Use 12+ characters for stronger protection');
  if (!checks.uppercase) suggestions.push('Add uppercase letters (A–Z)');
  if (!checks.lowercase) suggestions.push('Add lowercase letters (a–z)');
  if (!checks.number)    suggestions.push('Include numbers (0–9)');
  if (!checks.special)   suggestions.push('Add special characters (!@#$%^&*)');
  if (!checks.notCommon) suggestions.push('Avoid common words or patterns');

  return { checks, score, level, color, barWidth, suggestions };
}

function PasswordChecker() {
  const [pwd, setPwd] = useState('');
  const [show, setShow] = useState(false);
  const analysis = analyzePassword(pwd);

  const criteria = [
    { key: 'length8',   label: 'At least 8 characters' },
    { key: 'length12',  label: 'At least 12 characters' },
    { key: 'uppercase', label: 'Contains uppercase letter' },
    { key: 'lowercase', label: 'Contains lowercase letter' },
    { key: 'number',    label: 'Contains a number' },
    { key: 'special',   label: 'Contains a special character' },
    { key: 'notCommon', label: 'Not a common password pattern' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Privacy Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle className="mt-0.5 shrink-0 text-amber-500" size={18} />
        <p className="text-sm text-amber-800">
          <span className="font-semibold">⚠️ Privacy First:</span> We never store or transmit your
          password. This check runs entirely in your browser.
        </p>
      </div>

      {/* Input */}
      <div className="glass-card p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Enter a password to analyse
          </label>
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              placeholder="Type a password…"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              aria-label={show ? 'Hide password' : 'Show password'}
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Strength Bar */}
        {pwd.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Strength</span>
              <span className={`text-sm font-semibold ${
                analysis.level === 'Weak'   ? 'text-red-500'   :
                analysis.level === 'Fair'   ? 'text-amber-500' :
                                              'text-emerald-500'
              }`}>{analysis.level}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${analysis.color}`}
                style={{ width: analysis.barWidth }}
              />
            </div>
          </div>
        )}

        {/* Criteria checklist */}
        {pwd.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {criteria.map(c => {
              const met = analysis.checks[c.key];
              return (
                <div key={c.key} className="flex items-center gap-2">
                  {met
                    ? <CheckCircle size={16} className="shrink-0 text-emerald-500" />
                    : <XCircle    size={16} className="shrink-0 text-red-400" />
                  }
                  <span className={`text-sm ${met ? 'text-slate-700' : 'text-slate-400'}`}>
                    {c.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Suggestions */}
        {pwd.length > 0 && analysis.suggestions.length > 0 && (
          <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 space-y-1">
            <p className="text-sm font-semibold text-blue-700 mb-2">Suggestions to improve</p>
            {analysis.suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <ChevronRight size={14} className="mt-0.5 shrink-0 text-blue-500" />
                <span className="text-sm text-blue-800">{s}</span>
              </div>
            ))}
          </div>
        )}

        {/* Strong password note */}
        {pwd.length > 0 && analysis.level === 'Strong' && (
          <div className="flex items-start gap-2 rounded-lg bg-emerald-50 border border-emerald-100 p-3">
            <Info size={16} className="mt-0.5 shrink-0 text-emerald-600" />
            <p className="text-sm text-emerald-800">
              This password looks strong — but remember, <strong>no password is 100% safe</strong>. 
              Always use a unique password for each account and consider a password manager.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tool B: Scam Awareness Simulator ────────────────────────────────────────

const SCAM_SCENARIOS = [
  {
    id: 1,
    type: 'SMS',
    sender: 'SBI-ALERT',
    avatar: '🏦',
    message:
      'Dear Customer, Your SBI account will be BLOCKED within 24 hours. Click http://sbi-kyc-update.tk to update your KYC immediately. Ignore at your own risk.',
    options: [
      { id: 'a', label: 'Uses urgent / threatening language',           correct: true },
      { id: 'b', label: 'Link uses a suspicious non-official domain',   correct: true },
      { id: 'c', label: 'Uses a .tk domain (free, often abused)',       correct: true },
      { id: 'd', label: 'The message is from SBI, so it must be real',  correct: false },
      { id: 'e', label: 'Asks you to take action via an external link', correct: true },
    ],
    explanation: {
      a: 'Real banks rarely threaten to block accounts via SMS. Urgency is a classic manipulation tactic.',
      b: 'The official SBI domain is onlinesbi.sbi or sbi.co.in — not "sbi-kyc-update.tk".',
      c: '.tk is a free domain extension commonly used in phishing because it costs nothing.',
      d: 'SMS sender IDs can be spoofed. Any message can be made to look like it comes from a bank.',
      e: 'Banks will never ask you to click a link in an SMS to update KYC. Use the official app or branch.',
    },
  },
  {
    id: 2,
    type: 'Email',
    sender: 'kbc.lottery.prizes@gmail.com',
    avatar: '🎉',
    message:
      'CONGRATULATIONS!! You have been SELECTED as the lucky winner of KBC Lottery — ₹50,000 Prize! To claim your reward, kindly send ₹500 as processing fee to our agent via UPI. Act fast — offer expire in 24 hrs!',
    options: [
      { id: 'a', label: 'Too-good-to-be-true prize from an unknown source', correct: true },
      { id: 'b', label: 'Asks you to pay money first to claim a prize',      correct: true },
      { id: 'c', label: 'Sent from a Gmail address, not an official domain', correct: true },
      { id: 'd', label: 'Contains spelling and grammar errors',               correct: true },
      { id: 'e', label: 'Mentioning KBC makes it legitimate',                 correct: false },
    ],
    explanation: {
      a: 'Legitimate lotteries do not randomly select winners from people who never entered.',
      b: 'Asking you to pay a "processing fee" to claim a prize is the defining trait of an advance-fee scam.',
      c: 'Official organisations use their own domain — not @gmail.com or other free email services.',
      d: 'Typos like "expire" (instead of "expires") and excessive capitalisation are common scam signals.',
      e: 'Anyone can write "KBC" in a message. Brand names are frequently impersonated by scammers.',
    },
  },
  {
    id: 3,
    type: 'WhatsApp',
    sender: 'Unknown Number (+91 9XXX)',
    avatar: '💬',
    message:
      "Hi! It's me, your nephew Raju. I lost my phone and using a friend's number. Emergency situation — please send ₹2000 on UPI right now. Very urgent. Please don't tell mom or dad yet, I'll explain later.",
    options: [
      { id: 'a', label: "Identity is unverified — you can't confirm it's really Raju", correct: true },
      { id: 'b', label: 'Requests money urgently via UPI',                              correct: true },
      { id: 'c', label: 'Asks you to keep it secret from other family members',         correct: true },
      { id: 'd', label: 'The message is from a known contact, so it is safe',           correct: false },
      { id: 'e', label: 'Applies emotional pressure through a claimed emergency',        correct: true },
    ],
    explanation: {
      a: 'Never send money based on an unknown number claiming to be a relative. Call their known number to verify.',
      b: 'Requests for immediate UPI transfers — especially from unknown numbers — are a major red flag.',
      c: 'Asking you to keep secrets from family is a manipulation tactic to prevent you from getting a second opinion.',
      d: 'SIM cards can be stolen or cloned, and accounts can be compromised. Unknown number = unverified identity.',
      e: "Creating a sense of emergency is designed to bypass your rational thinking. Always pause and verify first.",
    },
  },
];

function ScamBubble({ scenario }) {
  const isEmail = scenario.type === 'Email';
  return (
    <div className={`rounded-xl border p-5 ${isEmail ? 'bg-white border-slate-200' : 'bg-[#DCF8C6] border-green-200'}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{scenario.avatar}</span>
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{scenario.type}</p>
          <p className="text-sm font-medium text-slate-800">{scenario.sender}</p>
        </div>
      </div>
      <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{scenario.message}</p>
    </div>
  );
}

function ScamSimulator() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const scenario = SCAM_SCENARIOS[scenarioIdx];

  const toggle = useCallback(id => {
    if (submitted) return;
    setSelected(s => ({ ...s, [id]: !s[id] }));
  }, [submitted]);

  const handleSubmit = () => {
    if (Object.keys(selected).filter(k => selected[k]).length === 0) return;
    setSubmitted(true);
  };

  const handleNext = () => {
    setScenarioIdx(i => (i + 1) % SCAM_SCENARIOS.length);
    setSelected({});
    setSubmitted(false);
  };

  const getOptionStatus = opt => {
    if (!submitted) return 'pending';
    const userSelected = !!selected[opt.id];
    if (opt.correct && userSelected)  return 'correct';
    if (opt.correct && !userSelected) return 'missed';
    if (!opt.correct && userSelected) return 'false_positive';
    return 'neutral';
  };

  const correctCount  = scenario.options.filter(o => o.correct && selected[o.id]).length;
  const totalCorrect  = scenario.options.filter(o => o.correct).length;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Disclaimer */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <Info className="mt-0.5 shrink-0 text-blue-500" size={18} />
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Educational Simulation</span> — All messages shown are
          fictional and created for training purposes only.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>Scenario {scenarioIdx + 1} of {SCAM_SCENARIOS.length}</span>
        <div className="flex gap-2">
          {SCAM_SCENARIOS.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition-all ${
                i === scenarioIdx ? 'bg-blue-600' : i < scenarioIdx ? 'bg-emerald-500' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Fake message */}
      <ScamBubble scenario={scenario} />

      {/* Question */}
      <div className="glass-card p-6 space-y-4">
        <p className="font-semibold text-slate-800">Can you spot the warning signs? Select all that apply.</p>

        <div className="space-y-3">
          {scenario.options.map(opt => {
            const status = getOptionStatus(opt);
            const isChecked = !!selected[opt.id];

            let rowClass = 'flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors';
            if (!submitted) {
              rowClass += isChecked
                ? ' border-blue-400 bg-blue-50'
                : ' border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40';
            } else {
              if (status === 'correct')        rowClass += ' border-emerald-400 bg-emerald-50';
              else if (status === 'missed')    rowClass += ' border-amber-400 bg-amber-50';
              else if (status === 'false_positive') rowClass += ' border-red-300 bg-red-50';
              else                             rowClass += ' border-slate-200 bg-white opacity-70';
            }

            return (
              <div key={opt.id} className={rowClass} onClick={() => toggle(opt.id)}>
                <div className={`mt-0.5 h-5 w-5 shrink-0 rounded border flex items-center justify-center transition-colors ${
                  isChecked ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                }`}>
                  {isChecked && <CheckCircle size={12} className="text-white" />}
                </div>
                <div className="flex-1">
                  <span className="text-sm text-slate-800">{opt.label}</span>
                  {submitted && status !== 'neutral' && (
                    <div className="mt-1 flex items-start gap-1.5">
                      {status === 'correct'        && <CheckCircle size={13} className="mt-0.5 shrink-0 text-emerald-500" />}
                      {status === 'missed'         && <AlertTriangle size={13} className="mt-0.5 shrink-0 text-amber-500" />}
                      {status === 'false_positive' && <XCircle size={13} className="mt-0.5 shrink-0 text-red-500" />}
                      <p className="text-xs text-slate-600">{scenario.explanation[opt.id]}</p>
                    </div>
                  )}
                </div>
                {submitted && (
                  <div className="shrink-0">
                    {status === 'correct'        && <span className="text-xs font-medium text-emerald-600">✓ Correct</span>}
                    {status === 'missed'         && <span className="text-xs font-medium text-amber-600">Missed</span>}
                    {status === 'false_positive' && <span className="text-xs font-medium text-red-600">Not a flag</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Score */}
        {submitted && (
          <div className={`rounded-lg p-4 text-center ${
            correctCount === totalCorrect
              ? 'bg-emerald-50 border border-emerald-200'
              : 'bg-blue-50 border border-blue-200'
          }`}>
            <p className="font-semibold text-slate-800">
              You spotted {correctCount} of {totalCorrect} real warning signs
            </p>
            <p className="text-sm text-slate-500 mt-1">
              {correctCount === totalCorrect
                ? 'Excellent! You identified every red flag.'
                : 'Review the missed flags above and keep practising.'}
            </p>
          </div>
        )}

        {/* Buttons */}
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.values(selected).every(v => !v)}
            className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit My Answers
          </button>
        ) : (
          <button onClick={handleNext} className="btn-primary w-full flex items-center justify-center gap-2">
            {scenarioIdx < SCAM_SCENARIOS.length - 1 ? 'Next Scenario' : 'Restart from Scenario 1'}
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Tool C: URL Safety Inspector ────────────────────────────────────────────

const SUSPICIOUS_TLDS = ['.tk', '.ml', '.ga', '.cf', '.gq'];
const LOOKALIKE_PATTERNS = [
  { pattern: /faceb[o0][o0]k/i,  brand: 'facebook' },
  { pattern: /g[o0][o0]gle/i,    brand: 'google' },
  { pattern: /paypa[l1]/i,       brand: 'paypal' },
  { pattern: /amaz[o0]n/i,       brand: 'amazon' },
  { pattern: /micr[o0]s[o0]ft/i, brand: 'microsoft' },
  { pattern: /app[l1]e/i,        brand: 'apple' },
  { pattern: /netfl[i1]x/i,      brand: 'netflix' },
];

function checkURL(raw) {
  const issues = [];
  let parsed;

  // 1. Valid URL format
  try {
    parsed = new URL(raw.startsWith('http') ? raw : `https://${raw}`);
  } catch {
    return [{ level: 'error', text: 'Invalid URL format — could not parse this as a URL.' }];
  }

  const full     = parsed.href;
  const host     = parsed.hostname;
  const pathname = parsed.pathname;

  // 2. HTTP vs HTTPS
  if (parsed.protocol === 'http:') {
    issues.push({ level: 'warning', text: 'Uses HTTP (not HTTPS) — the connection is unencrypted.' });
  }

  // 3. IP address as hostname
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipRegex.test(host)) {
    issues.push({ level: 'danger', text: 'Hostname is a raw IP address — legitimate sites use domain names.' });
  }

  // 4. Suspicious TLDs
  const matchedTLD = SUSPICIOUS_TLDS.find(tld => host.endsWith(tld));
  if (matchedTLD) {
    issues.push({ level: 'danger', text: `Domain uses a suspicious free TLD (${matchedTLD}) often associated with phishing.` });
  }

  // 5. Very long URL
  if (full.length > 100) {
    issues.push({ level: 'warning', text: `URL is very long (${full.length} characters) — phishing links often obfuscate destinations this way.` });
  }

  // 6. IP address embedded elsewhere in URL
  const ipInPath = /(\d{1,3}\.){3}\d{1,3}/.test(pathname);
  if (ipInPath && !ipRegex.test(host)) {
    issues.push({ level: 'warning', text: 'An IP address appears in the URL path — this is unusual and suspicious.' });
  }

  // 7. Embedded credentials
  if (parsed.username || parsed.password || full.includes('@')) {
    issues.push({ level: 'danger', text: 'URL contains embedded credentials or an "@" symbol — this can be used to spoof the displayed domain.' });
  }

  // 8. Lookalike / homograph patterns
  LOOKALIKE_PATTERNS.forEach(({ pattern, brand }) => {
    if (pattern.test(host) && !host.includes(brand)) {
      issues.push({ level: 'danger', text: `Domain looks like "${brand}" but is spelled differently — classic impersonation tactic.` });
    }
  });

  // 9. Multiple hyphens in domain
  const domainParts = host.split('.');
  domainParts.forEach(part => {
    if ((part.match(/-/g) || []).length >= 2) {
      issues.push({ level: 'warning', text: `Domain segment "${part}" contains multiple hyphens — often used to mimic legitimate domains.` });
    }
  });

  // 10. Subdomain trick: real domain is after last dot-pair before path
  //     e.g., sbi.com.malicious-site.com — public domain is malicious-site.com
  const labels = host.split('.');
  if (labels.length >= 4) {
    const knownBrands = ['sbi', 'hdfc', 'icici', 'paytm', 'google', 'facebook', 'amazon', 'paypal', 'apple'];
    const registrable = labels.slice(-2).join('.');
    const subdomains   = labels.slice(0, -2).join('.');
    if (knownBrands.some(b => subdomains.includes(b))) {
      issues.push({
        level: 'danger',
        text: `Subdomain trick detected — the actual registered domain is "${registrable}", not the brand name in the subdomain.`,
      });
    }
  }

  return issues;
}

function URLInspector() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [checked, setChecked] = useState('');

  const handleCheck = () => {
    if (!input.trim()) return;
    setResults(checkURL(input.trim()));
    setChecked(input.trim());
  };

  const hasIssues = results && results.length > 0;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="glass-card p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Paste a URL to inspect
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCheck()}
              placeholder="https://example.com/page?ref=abc"
              className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition text-sm"
            />
            <button onClick={handleCheck} className="btn-primary shrink-0">
              Check URL
            </button>
          </div>
        </div>

        {/* Results */}
        {results !== null && (
          <div className="space-y-3">
            {hasIssues ? (
              <>
                <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3">
                  <AlertTriangle size={18} className="shrink-0 text-red-500" />
                  <span className="font-semibold text-red-700">Warning signs found in this URL</span>
                </div>
                <div className="space-y-2">
                  {results.map((issue, i) => (
                    <div key={i} className={`flex items-start gap-2 rounded-lg border p-3 text-sm ${
                      issue.level === 'danger'
                        ? 'bg-red-50 border-red-200 text-red-800'
                        : issue.level === 'warning'
                        ? 'bg-amber-50 border-amber-200 text-amber-800'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      {issue.level === 'danger'
                        ? <XCircle size={15} className="mt-0.5 shrink-0 text-red-500" />
                        : <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-500" />
                      }
                      {issue.text}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 p-4">
                <Info size={18} className="mt-0.5 shrink-0 text-amber-600" />
                <div>
                  <p className="font-semibold text-amber-800">No obvious issues found</p>
                  <p className="text-sm text-amber-700 mt-1">
                    This URL passed all basic pattern checks, but that does not mean it is safe.
                    Basic pattern analysis cannot detect sophisticated phishing sites.
                  </p>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="flex items-start gap-2 rounded-lg bg-slate-100 border border-slate-200 p-3">
              <Info size={15} className="mt-0.5 shrink-0 text-slate-500" />
              <p className="text-xs text-slate-600">
                This tool performs basic pattern checks only. It cannot guarantee a URL is safe.
                Always verify by going directly to the official website — never click a link you are unsure about.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* How it works */}
      <div className="glass-card p-6">
        <p className="text-sm font-semibold text-slate-700 mb-3">What this tool checks (all locally in your browser)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            'Valid URL format',
            'HTTP vs HTTPS protocol',
            'Raw IP address as domain',
            'Suspicious TLDs (.tk .ml .ga .cf .gq)',
            'Unusually long URL length',
            'Embedded credentials / @ symbol',
            'Lookalike brand names (faceb00k etc.)',
            'Multiple hyphens in domain',
            'Subdomain impersonation tricks',
            'IP address embedded in path',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
              <Shield size={13} className="shrink-0 text-blue-500" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tool D: Cyber Incident Guidance ─────────────────────────────────────────

const INCIDENT_TYPES = [
  { id: 'financial',    icon: '💸', label: 'Financial Fraud / UPI Scam' },
  { id: 'phishing',     icon: '🔓', label: 'Phishing / Account Hacked' },
  { id: 'bullying',     icon: '😔', label: 'Cyberbullying' },
  { id: 'identity',     icon: '🪪', label: 'Identity Misuse / Fake Profile' },
  { id: 'other',        icon: '❓', label: 'Other Incident' },
];

const INCIDENT_STEPS = {
  financial: {
    headline: 'Financial Fraud / UPI Scam',
    helpline: '1930',
    steps: [
      { icon: '📞', text: 'Call 1930 immediately — the National Cyber Crime Financial Fraud Helpline. The sooner you call, the better the chance of fund recovery.' },
      { icon: '🌐', text: 'File an online complaint at cybercrime.gov.in — select "Financial Fraud" under cyber crimes.' },
      { icon: '🏦', text: 'Contact your bank urgently to freeze or reverse the transaction if possible. Ask for the transaction dispute team.' },
      { icon: '🛑', text: 'Do not send any more money — even if someone promises to help recover your funds.' },
      { icon: '📸', text: 'Document everything: take screenshots of transaction IDs, UPI references, messages, and any communication with the fraudster.' },
      { icon: '👮', text: 'File an FIR at your local police station with all documented evidence.' },
    ],
  },
  phishing: {
    headline: 'Phishing / Account Hacked',
    helpline: null,
    steps: [
      { icon: '🔑', text: 'Change your password immediately — on the compromised account and on any other account that shares the same password.' },
      { icon: '🔐', text: 'Enable two-factor authentication (2FA) on all important accounts — email, banking, social media.' },
      { icon: '📢', text: 'Notify your contacts that your account may have been compromised, so they don\'t fall for follow-up scams sent in your name.' },
      { icon: '🚩', text: 'Report the compromised account to the platform (Google, Facebook, Instagram, etc.) using their official "Account Hacked" process.' },
      { icon: '🌐', text: 'File a report at cybercrime.gov.in under "Other Cyber Crimes".' },
      { icon: '🔍', text: 'Check for any other linked accounts or apps that may have been authorised during the breach and revoke access.' },
    ],
  },
  bullying: {
    headline: 'Cyberbullying',
    helpline: null,
    steps: [
      { icon: '🛑', text: 'Do not respond to the bully — responding often escalates the situation.' },
      { icon: '📸', text: 'Take screenshots of all harassing messages, posts, or content as evidence (include timestamps, URLs, usernames).' },
      { icon: '🚫', text: 'Block and report the person on the platform where the bullying is happening.' },
      { icon: '👨‍👩‍👧', text: 'Talk to a trusted adult — a parent, teacher, school counsellor, or friend.' },
      { icon: '🌐', text: 'Report at cybercrime.gov.in — cyberbullying is a punishable offence in India.' },
      { icon: '💙', text: 'Reach out to iCall (9152987821) or Vandrevala Foundation (1860-2662-345) for emotional support.' },
    ],
  },
  identity: {
    headline: 'Identity Misuse / Fake Profile',
    helpline: null,
    steps: [
      { icon: '📸', text: 'Collect evidence — screenshot the fake profile, misused photos, or impersonation content with dates and URLs.' },
      { icon: '🚩', text: 'Report the fake profile directly to the platform (Facebook, Instagram, LinkedIn, etc.) using their "Report / Impersonation" option.' },
      { icon: '🌐', text: 'File a complaint at cybercrime.gov.in under "Online Content Related Crimes → Fake / Impersonating Profile".' },
      { icon: '👮', text: 'File an FIR at your nearest police station — impersonation with intent to harm is a criminal offence under Section 66C/66D IT Act.' },
      { icon: '📧', text: 'Write to the platform\'s safety team with the evidence for faster takedown of the fake content.' },
      { icon: '🔒', text: 'Review your privacy settings on all social media — limit who can download or share your photos.' },
    ],
  },
  other: {
    headline: 'Other Cyber Incident',
    helpline: null,
    steps: [
      { icon: '📸', text: 'Document the incident thoroughly — screenshots, URLs, message threads, dates and times.' },
      { icon: '🌐', text: 'Report at cybercrime.gov.in — the portal covers a wide range of cyber offences.' },
      { icon: '👮', text: 'File an FIR at your local police station with all your evidence.' },
      { icon: '🔒', text: 'Change passwords on any accounts that may have been affected.' },
      { icon: '📞', text: 'If financial loss is involved, call 1930 immediately.' },
      { icon: '👨‍👩‍👧', text: 'Speak with someone you trust — do not deal with this alone.' },
    ],
  },
};

function IncidentHelp() {
  const [selected, setSelected] = useState(null);
  const info = selected ? INCIDENT_STEPS[selected] : null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Incident type selector */}
      <div className="glass-card p-6 space-y-4">
        <p className="font-semibold text-slate-800">What type of incident are you dealing with?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INCIDENT_TYPES.map(type => (
            <button
              key={type.id}
              onClick={() => setSelected(type.id)}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                selected === type.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300'
                  : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40'
              }`}
            >
              <span className="text-2xl">{type.icon}</span>
              <span className="text-sm font-medium text-slate-800">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Steps */}
      {info && (
        <div className="glass-card p-6 space-y-5">
          <div>
            <p className="section-label">Incident Type</p>
            <h2 className="text-xl font-bold text-slate-900">{info.headline}</h2>
          </div>

          {/* Helpline banner for financial fraud */}
          {info.helpline && (
            <div className="flex items-center gap-4 rounded-xl bg-red-50 border border-red-200 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100">
                <span className="text-xl">📞</span>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-0.5">
                  Call Right Now
                </p>
                <p className="text-2xl font-bold text-red-700">{info.helpline}</p>
                <p className="text-xs text-red-600">National Cyber Crime Financial Fraud Helpline</p>
              </div>
            </div>
          )}

          <div>
            <p className="text-sm font-semibold text-slate-700 mb-3">Steps to Take Right Now</p>
            <ol className="space-y-3">
              {info.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                    {i + 1}
                  </div>
                  <div className="flex items-start gap-2 flex-1 pt-0.5">
                    <span>{step.icon}</span>
                    <span className="text-sm text-slate-700 leading-relaxed">{step.text}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Official link */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-3">
            <a
              href="https://cybercrime.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Globe size={16} />
              cybercrime.gov.in — Official Government Portal
              <ExternalLink size={14} className="ml-1" />
            </a>
            <p className="text-xs text-slate-500">
              File your complaint directly with the National Cyber Crime Reporting Portal (Government of India).
            </p>
          </div>
        </div>
      )}

      {/* Bottom disclaimer */}
      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <Info size={16} className="mt-0.5 shrink-0 text-slate-500" />
        <p className="text-xs text-slate-500">
          This guidance is educational only. CyberSafe does not receive your incident reports and is
          not affiliated with government agencies. For official reporting, use the government portal
          linked above.
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Tools() {
  const [activeTab, setActiveTab] = useState('password');

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-50 pb-16">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-4 py-8 text-center">
          <p className="section-label mb-2">Cyber Safety Toolkit</p>
          <h1 className="section-heading">Protect Yourself Online</h1>
          <p className="mt-2 text-slate-500 max-w-xl mx-auto text-sm">
            Free, browser-based tools to check your password strength, spot scams,
            analyse suspicious links, and get guidance if you've been targeted.
          </p>
        </div>

        {/* Tab Bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-4xl mx-auto flex overflow-x-auto scrollbar-none px-4">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tool Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {activeTab === 'password' && <PasswordChecker />}
          {activeTab === 'scam'     && <ScamSimulator />}
          {activeTab === 'url'      && <URLInspector />}
          {activeTab === 'incident' && <IncidentHelp />}
        </div>
      </div>
    </AppLayout>
  );
}
