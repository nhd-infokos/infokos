import { createSupabaseServerClient } from '@/lib/supabase-server'
import type { KosImage } from '@/types/kos'

/**
 * Add image to a kos.
 */
export async function addImage(kosId: string, data: { url: string; alt_text?: string; is_primary?: boolean; sort_order?: number }) {
  const supabase = await createSupabaseServerClient()
  const { data: image, error } = await supabase
    .from('kos_images')
    .insert({ kos_id: kosId, ...data })
    .select()
    .single()

  if (error) throw error
  return image as KosImage
}

/**
 * Delete image by ID.
 */
export async function deleteImage(id: string) {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('kos_images')
    .delete()
    .eq('id', id)

  if (error) throw error
}
