import { createSupabaseServerClient } from './supabase-server'

export type UserRole = 'admin' | 'member'

export interface AuthUser {
  id: string
  email: string
  role: UserRole
}

/**
 * Check if the current user is authenticated and has admin role.
 * Returns the user info if admin, or null if not authenticated/not admin.
 * Use this in API routes to protect admin endpoints.
 */
export async function checkAdminAuth(): Promise<{ user: AuthUser | null; error: string | null; status: number }> {
  try {
    const supabase = await createSupabaseServerClient()
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return { user: null, error: 'Unauthorized: Not authenticated', status: 401 }
    }

    // Check role from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, email, full_name')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return { user: null, error: 'Unauthorized: Profile not found', status: 401 }
    }

    if (profile.role !== 'admin') {
      return { user: null, error: 'Forbidden: Admin access required', status: 403 }
    }

    return {
      user: {
        id: user.id,
        email: profile.email || user.email || '',
        role: profile.role as UserRole,
      },
      error: null,
      status: 200,
    }
  } catch {
    return { user: null, error: 'Internal server error', status: 500 }
  }
}

/**
 * Get the current user's profile with role.
 * Returns null if not authenticated.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const supabase = await createSupabaseServerClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) return null

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, email, full_name')
      .eq('id', user.id)
      .single()

    if (!profile) return null

    return {
      id: user.id,
      email: profile.email || user.email || '',
      role: profile.role as UserRole,
    }
  } catch {
    return null
  }
}
