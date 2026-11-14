-- ============================================================
-- CyberSafe — Supabase Database Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Enable UUID extension (usually already enabled on Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES
-- One profile per auth.users row, created on sign-up.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL DEFAULT '',
  user_category TEXT CHECK (user_category IN ('Student','Parent','Teacher','Senior Citizen','General Internet User','Other')),
  preferred_language TEXT DEFAULT 'en',
  role        TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user','admin')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_own_read"   ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_own_update" ON public.profiles FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (role = (SELECT role FROM public.profiles WHERE id = auth.uid()));
  -- Users cannot change their own role via this policy

-- Admins can read all profiles (for the admin user list)
CREATE POLICY "profiles_admin_read" ON public.profiles FOR SELECT
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Service role can insert (called from sign-up trigger)
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- LEARNING MODULES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.learning_modules (
  id                TEXT PRIMARY KEY,
  title             TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
  description       TEXT NOT NULL DEFAULT '',
  category          TEXT NOT NULL DEFAULT '',
  difficulty        TEXT NOT NULL DEFAULT 'Beginner' CHECK (difficulty IN ('Beginner','Intermediate','Advanced')),
  estimated_minutes INTEGER NOT NULL DEFAULT 10,
  icon              TEXT DEFAULT '📚',
  content           JSONB DEFAULT '[]',
  published         BOOLEAN NOT NULL DEFAULT true,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.learning_modules ENABLE ROW LEVEL SECURITY;

-- Public can read published modules
CREATE POLICY "modules_public_read" ON public.learning_modules FOR SELECT
  USING (published = true);

-- Admins can do anything
CREATE POLICY "modules_admin_all" ON public.learning_modules FOR ALL
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE INDEX IF NOT EXISTS idx_modules_slug ON public.learning_modules(slug);
CREATE INDEX IF NOT EXISTS idx_modules_published ON public.learning_modules(published);

-- ============================================================
-- LESSON PROGRESS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id    TEXT NOT NULL REFERENCES public.learning_modules(id) ON DELETE CASCADE,
  status       TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress','completed')),
  started_at   TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, module_id)
);

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "progress_own_read"   ON public.lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "progress_own_insert" ON public.lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "progress_own_update" ON public.lesson_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_progress_user ON public.lesson_progress(user_id);

-- ============================================================
-- QUIZZES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.quizzes (
  id          TEXT PRIMARY KEY,
  module_id   TEXT REFERENCES public.learning_modules(id) ON DELETE SET NULL,
  title       TEXT NOT NULL,
  description TEXT DEFAULT '',
  published   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quizzes_public_read" ON public.quizzes FOR SELECT USING (published = true);
CREATE POLICY "quizzes_admin_all"   ON public.quizzes FOR ALL
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- ============================================================
-- QUIZ QUESTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id             TEXT PRIMARY KEY,
  quiz_id        TEXT NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question_text  TEXT NOT NULL,
  options        JSONB NOT NULL DEFAULT '[]',
  correct_answer INTEGER NOT NULL,
  explanation    TEXT DEFAULT '',
  sort_order     INTEGER DEFAULT 0
);

ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "questions_read" ON public.quiz_questions FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "questions_admin_all" ON public.quiz_questions FOR ALL
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE INDEX IF NOT EXISTS idx_questions_quiz ON public.quiz_questions(quiz_id, sort_order);

-- ============================================================
-- QUIZ ATTEMPTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id         TEXT NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  score           INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  submitted_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "attempts_own_read"   ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "attempts_own_insert" ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "attempts_admin_read" ON public.quiz_attempts FOR SELECT
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE INDEX IF NOT EXISTS idx_attempts_user ON public.quiz_attempts(user_id);

-- ============================================================
-- QUIZ RESPONSES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.quiz_responses (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  attempt_id      UUID NOT NULL REFERENCES public.quiz_attempts(id) ON DELETE CASCADE,
  question_id     TEXT NOT NULL,
  selected_answer INTEGER NOT NULL,
  is_correct      BOOLEAN NOT NULL DEFAULT false
);

ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "responses_own_read" ON public.quiz_responses FOR SELECT
  USING (
    auth.uid() = (
      SELECT user_id FROM public.quiz_attempts WHERE id = attempt_id
    )
  );

CREATE POLICY "responses_own_insert" ON public.quiz_responses FOR INSERT
  WITH CHECK (
    auth.uid() = (
      SELECT user_id FROM public.quiz_attempts WHERE id = attempt_id
    )
  );

-- ============================================================
-- ACHIEVEMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.achievements (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key         TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  criteria    JSONB DEFAULT '{}'
);

INSERT INTO public.achievements (key, name, description) VALUES
  ('first-steps',      'First Steps',          'Complete your first learning module'),
  ('scam-spotter',     'Scam Spotter',         'Complete the Phishing & Scams module and its quiz'),
  ('privacy-protector','Privacy Protector',     'Complete the Online Privacy module'),
  ('learning-champion','Learning Champion',     'Complete 5 or more learning modules')
ON CONFLICT (key) DO NOTHING;

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "achievements_public_read" ON public.achievements FOR SELECT USING (true);

-- ============================================================
-- USER ACHIEVEMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, achievement_id)
);

ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_achievements_own_read"   ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_achievements_own_insert" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- RESOURCES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.resources (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  slug          TEXT UNIQUE,
  description   TEXT DEFAULT '',
  resource_type TEXT NOT NULL DEFAULT 'article' CHECK (resource_type IN ('article','guide','checklist','video','faq')),
  category      TEXT DEFAULT '',
  content       TEXT DEFAULT '',
  external_url  TEXT DEFAULT '',
  published     BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "resources_public_read" ON public.resources FOR SELECT USING (published = true);
CREATE POLICY "resources_admin_all"   ON public.resources FOR ALL
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- ============================================================
-- TRIGGERS: auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER modules_updated_at BEFORE UPDATE ON public.learning_modules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER progress_updated_at BEFORE UPDATE ON public.lesson_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER resources_updated_at BEFORE UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

