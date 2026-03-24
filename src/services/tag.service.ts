import { createSupabaseAdmin } from '@/lib/supabase-admin'
import type { KosTag } from '@/types/kos'

/**
 * Add a tag to a kos.
 */
export async function addTag(kosId: string, data: { name: string; icon: string; sort_order?: number }) {
  const supabase = createSupabaseAdmin()
  const { data: tag, error } = await supabase
    .from('kos_tags')
    .insert({ kos_id: kosId, ...data })
    .select()
    .single()

  if (error) throw error
  return tag as KosTag
}

/**
 * Delete a tag by ID.
 */
export async function deleteTag(id: string) {
  const supabase = createSupabaseAdmin()
  const { error } = await supabase
    .from('kos_tags')
    .delete()
    .eq('id', id)

  if (error) throw error
}
