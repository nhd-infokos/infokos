import { createSupabaseAdmin } from '@/lib/supabase-admin'
import type { KosFacility } from '@/types/kos'

/**
 * Add facility to a kos.
 */
export async function addFacility(kosId: string, data: { name: string; icon?: string; sort_order?: number }) {
  const supabase = createSupabaseAdmin()
  const { data: facility, error } = await supabase
    .from('kos_facilities')
    .insert({ kos_id: kosId, ...data })
    .select()
    .single()

  if (error) throw error
  return facility as KosFacility
}

/**
 * Delete a facility by ID.
 */
export async function deleteFacility(id: string) {
  const supabase = createSupabaseAdmin()
  const { error } = await supabase
    .from('kos_facilities')
    .delete()
    .eq('id', id)

  if (error) throw error
}
