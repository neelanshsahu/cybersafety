-- ============================================================
-- CyberSafe — Seed Data
-- Run AFTER 001_initial_schema.sql
-- Inserts the 10 learning modules into the database.
-- ============================================================

INSERT INTO public.learning_modules (id, title, slug, description, category, difficulty, estimated_minutes, icon, published) VALUES
  ('password-security',       'Password Security',       'password-security',   'Learn why strong, unique passwords are your first line of defence and how to create them.',           'Security Fundamentals', 'Beginner',     8,  '🔐', true),
  ('phishing-scams',          'Phishing & Online Scams', 'phishing-scams',      'Recognise the tricks scammers use to steal your information through fake messages and websites.',     'Scams & Fraud',         'Beginner',    12,  '🎣', true),
  ('social-media-safety',     'Social Media Safety',     'social-media-safety', 'Control what you share, who sees it, and how to stay safe across social platforms.',                   'Social Media',          'Intermediate',10,  '📲', true),
  ('online-privacy',          'Online Privacy',          'online-privacy',      'Understand how your data is collected and what you can do to protect it.',                             'Privacy',               'Intermediate', 9,  '🔒', true),
  ('cyberbullying',           'Cyberbullying',           'cyberbullying',       'Understand, recognise, and respond to cyberbullying — whether you are a victim, bystander, or parent.','Safety',                'Beginner',     7,  '🤝', true),
  ('digital-payments',        'Digital Payment Safety',  'digital-payments',    'Stay safe using UPI, net banking, and digital wallets. Protect yourself from payment fraud.',          'Payments',              'Beginner',    11,  '💳', true),
  ('safe-browsing',           'Safe Browsing & Public Wi-Fi', 'safe-browsing',  'Browse the web securely, identify safe sites, and understand the risks of public Wi-Fi.',              'Security Fundamentals', 'Beginner',     6,  '🌐', true),
  ('identity-protection',     'Identity Protection',     'identity-protection', 'Protect your digital identity and learn how to recover if your information is compromised.',           'Identity',              'Advanced',    14,  '🪪', true),
  ('misinformation',          'Misinformation & Fake News','misinformation',    'Learn how to verify news and information before acting on or sharing it.',                             'Media Literacy',        'Intermediate',10,  '📰', true),
  ('smartphone-security',     'Smartphone Security',     'smartphone-security', 'Secure your Android or iPhone against common threats and privacy risks.',                              'Security Fundamentals', 'Intermediate', 8,  '📱', true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  estimated_minutes = EXCLUDED.estimated_minutes,
  icon = EXCLUDED.icon,
  published = EXCLUDED.published;

-- ============================================================
-- QUIZZES
-- ============================================================
INSERT INTO public.quizzes (id, module_id, title, description, published) VALUES
  ('password-security',   'password-security',   'Password Security Quiz',      'Test your knowledge of password best practices', true),
  ('phishing-scams',      'phishing-scams',      'Phishing Scams Quiz',         'Learn to identify and avoid phishing attempts', true),
  ('social-media-safety', 'social-media-safety', 'Social Media Safety Quiz',    'Evaluate your social privacy and awareness', true),
  ('online-privacy',      'online-privacy',      'Online Privacy Quiz',         'Assess your data protection knowledge', true),
  ('cyberbullying',       'cyberbullying',       'Cyberbullying Awareness Quiz', 'Test your understanding of online safety and empathy', true),
  ('digital-payments',    'digital-payments',    'Digital Payments Quiz',       'Protect yourself from UPI and net banking fraud', true),
  ('safe-browsing',       'safe-browsing',       'Safe Browsing Quiz',          'Recognize safe websites and public Wi-Fi risks', true),
  ('identity-protection', 'identity-protection', 'Identity Protection Quiz',    'Test your ability to guard personal information', true),
  ('misinformation',      'misinformation',      'Fake News Verification Quiz', 'Detect misleading claims and manipulated media', true),
  ('smartphone-security', 'smartphone-security', 'Smartphone Security Quiz',    'Keep your mobile devices and data secure', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- RESOURCES
-- ============================================================
INSERT INTO public.resources (title, slug, description, category, resource_type, external_url, published) VALUES
  ('Emergency Cybercrime Checklist', 'emergency-checklist', 'What to do in the first 60 minutes after suspected financial fraud or account compromise.', 'Emergency', 'checklist', 'https://cybercrime.gov.in', true),
  ('UPI & Mobile Banking Safety Guide', 'upi-safety-guide', 'Step-by-step instructions on securing UPI apps, setting transaction limits, and avoiding QR code scams.', 'Payments', 'guide', '', true),
  ('Parent Guide to Child Online Safety', 'parent-guide', 'How to talk to children about digital safety, set screen boundaries, and recognize signs of cyberbullying.', 'Family Safety', 'guide', '', true),
  ('Senior Citizen Digital Protection Handbook', 'senior-protection-handbook', 'Plain-language guide for elders navigating smartphones, WhatsApp forwards, and pension scams.', 'Senior Safety', 'guide', '', true),
  ('National Cyber Helpline 1930 Information Card', '1930-info-card', 'Printable card with emergency numbers, evidence preservation steps, and portal guidance.', 'Emergency', 'guide', 'https://cybercrime.gov.in', true)
ON CONFLICT (slug) DO NOTHING;

