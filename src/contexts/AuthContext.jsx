import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [configured] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!configured) {
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [configured])

  async function fetchProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (!error) setProfile(data)
    } catch {
      // Profile may not exist yet — handled in SignUp
    } finally {
      setLoading(false)
    }
  }

  async function signUp({ email, password, fullName, userCategory }) {
    if (!configured) return { error: { message: 'Supabase is not configured. See .env.example.' } }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          user_category: userCategory,
        }
      }
    })

    if (error) return { error }

    // Insert or update profile row
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: data.user.id,
        full_name: fullName,
        user_category: userCategory,
      }, { onConflict: 'id' })
      if (profileError) console.warn('Profile upsert notice:', profileError.message)
    }

    return { data }
  }

  async function signIn({ email, password }) {
    if (!configured) return { error: { message: 'Supabase is not configured. See .env.example.' } }
    return supabase.auth.signInWithPassword({ email, password })
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  async function sendPasswordReset(email) {
    if (!configured) return { error: { message: 'Supabase is not configured.' } }
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
  }

  async function updatePassword(newPassword) {
    return supabase.auth.updateUser({ password: newPassword })
  }

  async function updateProfile(updates) {
    if (!user) return { error: { message: 'Not authenticated' } }
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id)
      .select()
      .single()

    if (!error) setProfile(data)
    return { data, error }
  }

  const isAdmin = profile?.role === 'admin'

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      configured,
      isAdmin,
      signUp,
      signIn,
      signOut,
      sendPasswordReset,
      updatePassword,
      updateProfile,
      refreshProfile: () => user && fetchProfile(user.id),
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

