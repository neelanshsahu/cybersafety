-- ============================================================
-- CyberSafe — HOTFIX: Infinite Recursion in RLS Policies
-- 
-- Run this in Supabase SQL Editor AFTER 001_initial_schema.sql
-- This replaces the recursive policies with a safe pattern.
-- ============================================================

-- ─── STEP 1: Create a security-definer function ──────────────
-- This function bypasses RLS when checking the current user's role,
-- which prevents the circular reference loop that causes the error.
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$;

-- Grant execution to authenticated and anon users
GRANT EXECUTE ON FUNCTION public.get_my_role() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_my_role() TO anon;

-- ─── STEP 2: Fix profiles policies ───────────────────────────
DROP POLICY IF EXISTS "profiles_own_read"   ON public.profiles;
DROP POLICY IF EXISTS "profiles_own_update" ON public.profiles;
DROP POLICY IF EXISTS "profiles_admin_read" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert"     ON public.profiles;

-- A user can read their own profile
CREATE POLICY "profiles_own_read" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- An admin can read ALL profiles (uses safe function, no recursion)
CREATE POLICY "profiles_admin_read" ON public.profiles
  FOR SELECT USING (public.get_my_role() = 'admin');

-- A user can update their own profile
CREATE POLICY "profiles_own_update" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- An admin can update any profile (e.g. promote to admin)
CREATE POLICY "profiles_admin_update" ON public.profiles
  FOR UPDATE USING (public.get_my_role() = 'admin');

-- Allow insert on sign-up (user inserts their own row)
CREATE POLICY "profiles_insert" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ─── STEP 3: Fix learning_modules admin policy ────────────────
DROP POLICY IF EXISTS "modules_admin_all" ON public.learning_modules;

CREATE POLICY "modules_admin_all" ON public.learning_modules
  FOR ALL USING (public.get_my_role() = 'admin');

-- ─── STEP 4: Fix quizzes admin policy ────────────────────────
DROP POLICY IF EXISTS "quizzes_admin_all" ON public.quizzes;

CREATE POLICY "quizzes_admin_all" ON public.quizzes
  FOR ALL USING (public.get_my_role() = 'admin');

-- ─── STEP 5: Fix quiz_questions admin policy ─────────────────
DROP POLICY IF EXISTS "questions_admin_all" ON public.quiz_questions;

CREATE POLICY "questions_admin_all" ON public.quiz_questions
  FOR ALL USING (public.get_my_role() = 'admin');

-- ─── STEP 6: Fix quiz_attempts admin policy ──────────────────
DROP POLICY IF EXISTS "attempts_admin_read" ON public.quiz_attempts;

CREATE POLICY "attempts_admin_read" ON public.quiz_attempts
  FOR SELECT USING (public.get_my_role() = 'admin');

-- ─── STEP 7: Fix resources admin policy ──────────────────────
DROP POLICY IF EXISTS "resources_admin_all" ON public.resources;

CREATE POLICY "resources_admin_all" ON public.resources
  FOR ALL USING (public.get_my_role() = 'admin');

-- Also make resources visible to all users
DROP POLICY IF EXISTS "resources_public_read" ON public.resources;
DROP POLICY IF EXISTS "resources_auth_read" ON public.resources;

CREATE POLICY "resources_read_all" ON public.resources
  FOR SELECT USING (true);

-- ─── STEP 8: Auto-create profile trigger on signup ────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, user_category, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'user_category', 'General Internet User'),
    'user'
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    user_category = COALESCE(EXCLUDED.user_category, public.profiles.user_category);
  RETURN NEW;
END;
$$;

-- Create the trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

